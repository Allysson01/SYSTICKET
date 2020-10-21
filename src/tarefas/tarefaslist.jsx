import React, { useState, useContext, useEffect } from "react";
import "../assets/css/custom.css";
import Helmet from "react-helmet";
import PageHeader from "../template/pageHeader";
import FadeIn from "../template/fadeIn";
import StoreContext from "../store/Context";
import Login from "../login/login";
import axios from "axios";
import ModalShow from "../modals/modalDescription";

const URL = "https://localhost:44318/api/tickets/ticketget";

let search = "";

let pagina = 0;
let numPagina = 0;

function buttonNext() {
  if (numPagina - 1 > pagina) {
    pagina++;
  }
}

function buttonBack() {
  if (pagina > 0) {
    pagina--;
  }
}

function initialState() {
  return { subject: null, search: "" };
}

function modalState() {
  return { modalShow: false };
}

function datState() {
  return { Obj: [] };
}

function propsModal() {
  return {
    ticketid: "",
    tipo: "",
    assunto: "",
    prioridade: "",
    solicitado: "",
    atendido: "",
    color: "",
    description: "",
  };
}

export default (props) => {
  const { token } = useContext(StoreContext);
  const { id } = useContext(StoreContext);

  const [state, setState] = useState(initialState);

  const [data, dataState] = useState(datState);

  const [Modal, setModal] = useState(propsModal);

  const [stateModal, setModalShow] = useState(modalState);

  function showNewModal(e) {
    e.preventDefault();
    setModalShow({ ...stateModal, modalShow: !stateModal.modalShow });
  }

  if (state.subject === null) {
    pagina = 0;
  }

  useEffect(() => {
    async function refresh() {
      axios
        .post(URL, { Id: id })
        .then((resp) => {
          console.log();
          dataState({ Obj: resp.data });
        })
        .catch({
          function(error) {
            dataState({ Obj: [] });
          },
        });
    }
    refresh();
  }, [id]);

  const renderRows = () => {
    const tamanhoPagina = 6;
    let ObjData = Object.entries(data.Obj);
    let list = [];

    if (search === "") {
      for (
        var i = pagina * tamanhoPagina;
        i < ObjData.length && i < (pagina + 1) * tamanhoPagina;
        i++
      ) {
        list.push(ObjData[i][1]);
      }
      numPagina = Math.ceil(data.Obj.length / tamanhoPagina);
    } else {
      let hasRow = false;
      ObjData.map(function(item) {
        Object.entries(item[1]).map(function(filter) {
          if (isNaN(search)) {
            if (
              filter[0] !== "id" &&
              filter[0] !== "atendido" &&
              filter[0] !== "descricao" &&
              filter[0] !== "personId" &&
              filter[0] !== "tela" &&
              filter[0] !== "arquivo" &&
              filter[0] !== "cliente" &&
              filter[0] !== "cor" &&
              filter[0] !== "prioridadeId" &&
              filter[0] !== "tipoId" &&
              filter[0] !== "validation" &&
              filter[0] !== "fileBase64" &&
              filter[1]
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toUpperCase()
                .includes(
                  search
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toUpperCase()
                )
            ) {
              list.push(item[1]);
              hasRow = true;
            }
          } else {
            const num = parseInt(search);
            if (Object.values(filter).includes(num)) {
              list.push(item[1]);
              hasRow = true;
            }
          }
          return true;
        });
        return true;
      });

      if (!hasRow) {
        list.push({
          id: "#",
          tipo: "",
          assunto: "Sem registros com essa pesquisa",
          cor: "",
          prioridade: "",
          dataSolicitacao: "",
        });
      }
      let listAux = list;
      if (listAux.length > tamanhoPagina) {
        list = [];
        for (
          var h = pagina * tamanhoPagina;
          h < listAux.length && h < (pagina + 1) * tamanhoPagina;
          h++
        ) {
          list.push(listAux[h]);
        }
        numPagina = Math.ceil(listAux.length / tamanhoPagina);
      } else {
        numPagina = Math.ceil(list.length / tamanhoPagina);
      }
      listAux = [];
    }
    return list.map((dados, key) => (
      <tr key={key} id={dados.id + key}>
        <td width="100">{dados.id}</td>
        <td width="200">
          <span style={{ color: dados.cor }}>
            <i className="fa fa-ticket" aria-hidden="true"></i>
          </span>{" "}
          {dados.tipo}
        </td>
        <td width="400">{dados.assunto}</td>
        <td width="150">{dados.prioridade}</td>
        <td width="150">{dados.dataSolicitacao}</td>
        <td
          width="150"
          style={dados.atendido ? { color: "#008000" } : { color: "#ffd700" }}
        >
          {dados.atendido ? (
            <i className="fa fa-check" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-minus" aria-hidden="true"></i>
          )}
        </td>
        <td width="120">
          <div className="pointer col-md-8 col-sm-8">
            <button
              value={dados.id}
              className="fa fa-list-alt styleButton"
              onClick={showModal}
            ></button>
          </div>
        </td>
      </tr>
    ));
  };

  async function retunrTicket(TicketId) {
    let pp = [];
    const data = {
      Id: id,
      search: TicketId,
    };
    await axios.post(URL, data).then((resp) => {
      pp = resp.data;
      pp.map(function(filter) {
        if (filter.id.toString() === TicketId.toString()) {
          setModal({
            ...Modal,
            ticketid: filter.id,
            tipo: filter.tipo,
            assunto: filter.assunto,
            prioridade: filter.prioridade,
            solicitado: filter.solicitado,
            atendido: filter.atendido,
            color: filter.cor,
            description: filter.descricao,
          });
        }
        return pp;
      });
    });
    setModalShow({...stateModal, modalShow: !stateModal.modalShow});
  }

  function changeTable(stateSeach) {
    search = stateSeach;
  }

  function searchChange(e) {
    setState({ ...state, search: e.target.value });
  }

  function btnSearch() {
    setState({ ...state, subject: !state.subject });
    changeTable(state.search);
  }

  function btnClear() {
    setState({ ...state, subject: !state.subject, search: "" });
    pagina = 0;
    changeTable("");
  }

  function nextChange(e) {
    setState({ ...state, subject: !state.subject });
    buttonNext();
  }

  function backChange(e) {
    setState({ ...state, subject: !state.subject });
    buttonBack();
  }

  async function showModal(e) {
    const idTable = e.target.value;
    retunrTicket(idTable);
  }

  return token ? (
    <>
    <ModalShow
          modalShow={stateModal.modalShow}
          closeModal={showNewModal}
          subject={Modal.assunto.toLocaleUpperCase()}
          cor={Modal.color}
          tipo={Modal.tipo}
          priority={Modal.prioridade}
          desc={Modal.description}
        ></ModalShow>
      <div className="container">        
        <Helmet>
          <title>Meus Tickets</title>
        </Helmet>
        <FadeIn>
          <PageHeader
            name="Meus Tickets"
            isColor="#2F4F4F"
            isHidden="false"
          ></PageHeader>
          <div className="tableRow">
            <div className="searchDiv">
              <input
                className="inpSearch"
                type="text"
                placeholder="Pesquisar"
                onChange={searchChange}
                value={state.search}
              />
              <button onClick={btnSearch} className="btnSearch">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
              <button className="btnClear" onClick={btnClear}>
                Limpar
              </button>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Tipo</th>
                  <th>Assunto</th>
                  <th>Prioridade</th>
                  <th>Solicitado</th>
                  <th>Antendido</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody id="tBody">{renderRows()}</tbody>
            </table>
          </div>
          <div style={{ textAlign: "right" }}>
            <button onClick={backChange} className="btn btn-light styleButton">
              Anterior
            </button>
            <span className="page">
              {pagina + 1} de {numPagina}{" "}
            </span>
            <button onClick={nextChange} className="btn btn-light styleButton">
              Próximo
            </button>
          </div>
        </FadeIn>
      </div>
    </>
  ) : (
    <Login />
  );
};
