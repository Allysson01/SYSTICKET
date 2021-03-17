import React, { useState, useContext, useEffect } from "react";
import "../assets/css/custom.css";
import Helmet from "react-helmet";
import PageHeader from "../template/pageHeader";
import FadeIn from "../template/fadeIn";
import StoreContext from "../store/Context";
import Login from "../login/login";
import axios from "axios";
import ModalShow from "../modals/modalDescription";
import lstFilter from "../arquivosJS/lstPage";

const URL = "https://localhost:44318/api/tickets/ticketget";

let pagina = 0;
let numPagina = 0;

function buttonNext() {
  const btnBack = document.getElementById("btnBack");
  btnBack.removeAttribute("Disabled");
  if (numPagina - 1 > pagina) {
    pagina++;
  } else {
    const btn = document.getElementById("btnNext");
    btn.setAttribute("Disabled", "true");
  }
  return pagina;
}

function buttonBack() {
  if (pagina > 0) {
    pagina--;
    const btn = document.getElementById("btnNext");
    btn.removeAttribute("Disabled");
  } else {
    const btn = document.getElementById("btnBack");
    btn.setAttribute("Disabled", "true");
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
  console.log('oi');

  useEffect(() => {
    async function refresh() {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
     await axios
        .post(URL, { PersonId: id, Page: pagina, Search: "" }, config)
        .then((resp) => {
          dataState({ Obj: resp.data });
        })
        .catch({
          function(error) {
            dataState({ Obj: [] });
          },
        });
    }
    refresh();
    // Desabilita a necessidade de colocar Token e Id dentro do Array a baixo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const renderRows = () => {
    return data.Obj.map(
      (dados, key) => (
        // eslint-disable-next-line no-sequences
        (numPagina = dados.totalRecord / 6),
        (
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
              style={
                dados.atendido ? { color: "#008000" } : { color: "#ffd700" }
              }
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
        )
      )
    );
  };

  async function retunrTicket(TicketId) {
    let lst = [];
    const data = {
      Id: id,
      search: TicketId,
    };
    await axios.post(URL, data).then((resp) => {
      lst = resp.data;
      lst.map(function(filter) {
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
        return lst;
      });
    });
    setModalShow({ ...stateModal, modalShow: !stateModal.modalShow });
  }

  function searchChange(e) {
    setState({ ...state, search: e.target.value });
  }

  //Pesquisa
  const btnSearch = async () => {
    await listData();
    setState({ ...state, subject: !state.subject });
  };

  const listData = async (filter) => {
    const pesq = filter === "0" ? "" : state.search;

    const data = {
      Search: pesq,
      Page: 0,
      PersonId: id,
    };
    const lst = await lstFilter(data);
    dataState({ Obj: lst });
  };

  const btnClear = async () => {
    pagina = 0;
    await listData("0");
  };

  const nextChange = async () => {
    const page = buttonNext();
    const data = {
      Search: "",
      Page: page + 1,
      PersonId: id,
    };
    console.log(data);
    const lst = await lstFilter(data);

    dataState({ Obj: lst });
    setState({ ...state, subject: !state.subject });
  };

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
            <button
              onClick={backChange}
              id="btnBack"
              className="btn btn-light styleButton"
            >
              Anterior
            </button>
            <span className="page">
              {pagina + 1} de {numPagina}{" "}
            </span>
            <button
              onClick={nextChange}
              id="btnNext"
              className="btn btn-light styleButton"
            >
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
