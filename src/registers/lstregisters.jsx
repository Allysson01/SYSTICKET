import React, { useState, useContext, useEffect } from "react";
import "../assets/css/custom.css";
import Helmet from "react-helmet";
import PageHeader from "../template/pageHeader";
import FadeIn from "../template/fadeIn";
import StoreContext from "../store/Context";
import Login from "../login/login";
import axios from "axios";
import { useHistory } from "react-router-dom";

const URL = "https://localhost:44318/api/person/getpeopleall";

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

function datState() {
  return { Obj: [] };
}

export default (props) => {
  const { token } = useContext(StoreContext);
  const { id } = useContext(StoreContext);
  const history = useHistory(); 

  const [state, setState] = useState(initialState);

  const [data, dataState] = useState(datState); 

  if (state.subject === null) {
    pagina = 0;
  }

  useEffect(() => {
    function refresh() {
      axios
        .get(URL)
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
  },[id]);

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
              filter[0] !== "isManager" &&
              filter[0] !== "password" &&
              filter[0] !== "personId" &&
              filter[0] !== "search" &&
              filter[0] !== "validation" &&
              filter[0] !== "email" &&
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
        <td width="300">{dados.name}</td>
        <td width="150">{dados.cpf}</td>
        <td width="200">{dados.email}</td>
        <td width="150" style={{ color: "#008000" }}>
          {dados.isManager ? (
            <i className="fa fa-check" aria-hidden="true"></i>
          ) : ('')}
        </td>
        <td width="120">
          <div className="pointer col-md-8 col-sm-8">
            <button
              value={dados.id}
              className="fa fa-pencil-square-o styleButton"
              onClick={showUserPage}
            ></button>
          </div>
        </td>
      </tr>
    ));
  };  

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

  function showUserPage(e) { 
          
    history.push(`/userpage/:${e.target.value}`);
  }

  return token ? (
    <div className="container">
      <Helmet>
        <title>Telegestão Cadastro</title>
      </Helmet>
      <FadeIn>
        <PageHeader
          name="Lista de Usuários"
          isColor="#CD3333"
          icon="fa fa-user"
          isHidden="false"
          adduser="true"
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
                <th>#</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Gestor?</th>                
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="tBody">{renderRows()}</tbody>
          </table>
        </div>
        <div style={{ textAlign: "right" }}>
          <button
            onClick={backChange}
            className="btn btn-light styleButton"
          >
            Anterior
          </button>
          <span className="page">
            {pagina + 1} de {numPagina}{" "}
          </span>
          <button
            onClick={nextChange}
            className="btn btn-light styleButton"
          >
            Próximo
          </button>
        </div>
      </FadeIn>
     
    </div>
  ) : (
    <Login />
  );
};
