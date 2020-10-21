import React, { useState, useContext, useEffect } from "react";
import StoreContext from "../store/Context";
import PageHeader from "../template/pageHeader";
import FadeIn from "../template/fadeIn";
import "../assets/css/custom.css";
import Grid from "../template/grid";
import Helmet from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Login from "../login/login";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";

const URL = "https://localhost:44318/api/person/getuserpage";

function initialState() {
  return { fullname: "", cpf: "", email: "", pass: "", confirmPass: "" };
}

export default (props) => {
  const [state, setState] = useState(initialState);
  const { token } = useContext(StoreContext);
  const { isManager } = useContext(StoreContext);
  const { params } = useParams();
  const data = params.replace(":", "");

  const Manager = () => {
    if (isManager) {
      return (
        <Link
          to="/lstregisters"
          type="button"
          className="btn btn-secondary"
          style={style}
        >
          Cancelar
        </Link>
      );
    } else {
      return (
        <Link
          to="/todos"
          type="button"
          className="btn btn-secondary"
          style={style}
        >
          Cancelar
        </Link>
      );
    }
  };

  useEffect(() => {
    function refresh() {
      axios
        .post(URL, { Id: parseInt(data) })
        .then((resp) => {
          setState({
            fullname: resp.data.name,
            cpf: resp.data.cpf,
            email: resp.data.email,
          });
        })
        .catch({
          function(error) {
            setState({ fullname: "", cpf: "", email: "" });
          },
        });
    }
    refresh();
  }, [data]);

  const renderUserPage = () => {
    return (
      <div className="borderContent">
        <div className="form-group" style={lbStyle}>
          <div className="col-sm-10">
            <Grid cols="12">
              <div className="form-group">
                <div className="col-sm-2">
                  <label className="inpLabel">Nome:</label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    onChange={nameChange}
                    value={state.fullname}
                  />
                </div>
              </div>
            </Grid>

            <Grid cols="12">
              <div className="form-group" style={lbStyle}>
                <div className="col-sm-2">
                  <label className="inpLabel">CPF:</label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    onChange={cpfChange}
                    value={state.cpf}
                  />
                </div>
              </div>
            </Grid>

            <Grid cols="12">
              <div className="form-group" style={lbStyle}>
                <div className="col-sm-2">
                  <label className="inpLabel">E-mail:</label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    onChange={emailChange}
                    value={state.email}
                  />
                </div>
              </div>
            </Grid>

            <Grid cols="12">
              <div className="form-group" style={lbStyle}>
                <div className="col-sm-2">
                  <label className="inpLabel">Senha atual:</label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="password"
                    id="pass"
                    name="pass"
                    className="form-control"
                    onChange={passChange}
                    value={state.pass ?? ""}
                  />
                </div>
              </div>
            </Grid>

            <Grid cols="12">
              <div className="form-group" style={lbStyle}>
                <div className="col-sm-2">
                  <label className="inpLabel">Nova senha:</label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="password"
                    id="confirm"
                    name="confirm"
                    className="form-control"
                    onChange={confirmChange}
                    value={state.confirmPass ?? ""}
                  />
                </div>
              </div>
            </Grid>
          </div>
          <div className="col-sm-2">
            <div className="iconUserSecrets">
              <i className="fa fa-user-secret fa-5x" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    );
  };

  //Função para receber o valor do campo input e alterar o estado
  function confirmChange(e) {
    setState({ ...state, confirmPass: e.target.value });
  }

  function passChange(e) {
    setState({ ...state, pass: e.target.value });
  }
  function emailChange(e) {
    setState({ ...state, email: e.target.value });
  }
  function cpfChange(e) {
    setState({ ...state, cpf: e.target.value });
  }
  function nameChange(e) {
    setState({ ...state, fullname: e.target.value });
  }

  const style = {
    backgroundColor: "#1C1C1C",
    borderColor: "#FFFFFF",
  };

  const lbStyle = {
    marginTop: "10px",
  };

  return token ? (
    <div className="container">
      <Helmet>
        <title>Ticket Carga </title>
      </Helmet>
      <FadeIn>
        <PageHeader
          name={state.fullname}
          isColor="#084B8A"
          isHidden="false"
          icon="fa fa-pencil"
        ></PageHeader>
        <>{renderUserPage()}</>
        <div className="btnSaveOrCancel">
          {Manager()}
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </div>
      </FadeIn>
    </div>
  ) : (
    <Login />
  );
};
