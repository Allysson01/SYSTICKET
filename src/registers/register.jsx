import React, { useState, useContext } from "react";
import StoreContext from "../store/Context";
import PageHeader from "../template/pageHeader";
import "../assets/css/custom.css";
import Grid from "../template/grid";
// import Menu from "../template/menu";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Login from "../login/login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const URL = "https://localhost:44318/api/person/personcad";

function initialState() {
  return {
    name: "",
    cpf: "",
    email: "",
    confirmeEmail: "",
    password: "",
    confirmePassword: "",
    isManager: false,
  };
}

export default () => {
  const [state, setState] = useState(initialState);
  const { token } = useContext(StoreContext);
  const { id } = useContext(StoreContext);
  const { setToken } = useContext(StoreContext);
  const { setName } = useContext(StoreContext);
  const { setId } = useContext(StoreContext);
  const history = useHistory();

  const savePeople = async () => {
    if (
      !state.name ||
      !state.cpf ||
      !state.email ||
      !state.confirmeEmail ||
      !state.password ||
      !state.confirmePassword
    ) {
      return toast.error("Todos os campos são obrigatórios!");
    }

    if (state.confirmeEmail !== state.email) {
      return toast.error("E-mail não é igual a confirmação de e-mail");
    }

    if (state.password !== state.confirmePassword) {
      return toast.error("Senha não é igual a confirmação de senha");
    }

    const personData = {
      Name: state.name,
      CPF: state.cpf,
      Email: state.email,
      isManager: state.isManager,
      Password: state.password,
      Validation: token,
      PersonId: id,
    };

    await axios
      .post(URL, personData)
      .then((resp) => {
        if (resp.data.isValidDate) {
          setState({...state, name:'', cpf:'', email:'', confirmeEmail:'', confirmePassword:'', isManager:false, password:''})
          toast.success("Cadastrado com sucesso!");
        } else {
          setState({...state, name:'', cpf:'', email:'', confirmeEmail:'', confirmePassword:'', isManager:false, password:''})
          toast.error(resp.data.message);
          setTimeout(function() {
            setToken("token", "");
            setName("name", "");
            setId("id", 0);
            return history.push("*");
          }, 6000);
        }
      })
      .catch(function(err) {
        toast.error("Erro: " + err);
      });
  };

  const changePass = (e) => {
    let element = "";
    if (e.target.id === "senhaId") {
      element = document.getElementById("senha");
    }
    if (e.target.id === "confirmId") {
      element = document.getElementById("confirmSenha");
    }
    if (element.type === "text") {
      element.type = "password";
    } else {
      element.type = "text";
    }
  };
  function nameChange(e) {
    setState({ ...state, name: e.target.value });
  }

  function cpfChange(e) {
    setState({ ...state, cpf: e.target.value });
  }

  function emailChange(e) {
    setState({ ...state, email: e.target.value });
  }

  function confirmEChange(e) {
    setState({ ...state, confirmeEmail: e.target.value });
  }

  function passwordChange(e) {
    setState({ ...state, password: e.target.value });
  }

  function confirmPChange(e) {
    setState({ ...state, confirmePassword: e.target.value });
  }

  function managerChange() {
    setState({ ...state, isManager: !state.isManager });
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
      <Helmet title="TeleGestão Cadastro" />
      <ToastContainer />
      {/* <Menu></Menu> */}
      <PageHeader
        name="Cadastro"
        isColor="#CD3333"
        isHidden="false"
        icon="fa fa-user"
      ></PageHeader>
      <div className="borderContent">
        <div className="form-group" style={lbStyle}>
          <div className="col-sm-12">
            <Grid cols="12">
              <div className="form-group">
                <div className="col-sm-2">
                  <label className="inpLabel">Nome:</label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="text"
                    id="inpErro"
                    className="form-control"
                    placeholder="Ex.: José Henrique"
                    onChange={nameChange}
                    value={state.name}
                  />
                </div>
              </div>
            </Grid>

            <Grid cols="12">
              <div className="form-group" style={lbStyle}>
                <div className="col-sm-2">
                  <label
                    className="inpLabel"
                    title="Apenas usado para recuperação de login"
                  >
                    CPF:{" "}
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex.: 001.002.003-04"
                    onChange={cpfChange}
                    value={state.cpf}
                  />
                </div>
              </div>
            </Grid>

            <Grid cols="12">
              <div className="form-group" style={lbStyle}>
                <div className="col-sm-2">
                  <label className="inpLabel">Email:</label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex.: martins@telegestao.com.br"
                    onChange={emailChange}
                    value={state.email}
                  />
                </div>
              </div>
            </Grid>
            <Grid cols="12">
              <div className="form-group" style={lbStyle}>
                <div className="col-sm-2">
                  <label className="inpLabel">Confirme Email:</label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex.: martins@telegestao.com.br"
                    onChange={confirmEChange}
                    value={state.confirmeEmail}
                  />
                </div>
              </div>
            </Grid>

            <Grid cols="12">
              <div className="form-group" style={lbStyle}>
                <div className="col-sm-2">
                  <label className="inpLabel">Senha:</label>
                </div>
                <div className="col-sm-10">
                  <div className="input-group">
                    <input
                      type="password"
                      id="senha"
                      className="form-control"
                      onChange={passwordChange}
                      value={state.password}
                    />
                    <span className="input-group-addon">
                      <button
                        id="senhaId"
                        onClick={changePass}
                        className="fa fa-eye eye"
                        aria-hidden="true"
                      ></button>
                    </span>
                  </div>
                </div>
              </div>
            </Grid>

            <Grid cols="12">
              <div className="form-group" style={lbStyle}>
                <div className="col-sm-2">
                  <label className="inpLabel">Confirme Senha:</label>
                </div>
                <div className="col-sm-10">
                  <div className="input-group">
                    <input
                      type="password"
                      id="confirmSenha"
                      className="form-control"
                      onChange={confirmPChange}
                      value={state.confirmePassword}
                    />
                    <span className="input-group-addon">
                      <button
                        id="confirmId"
                        onClick={changePass}
                        className="fa fa-eye eye"
                        aria-hidden="true"
                      ></button>
                    </span>
                  </div>
                </div>
              </div>
            </Grid>

            <Grid cols="12">
              <div className="form-group" style={lbStyle}>
                <div className="col-sm-2">
                  <label className="inpLabel">isManager:</label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={managerChange}
                    checked={state.isManager}
                  />
                </div>
              </div>
            </Grid>
          </div>
        </div>
      </div>
      <div className="btnSaveOrCancel">
        <Link
          to="/lstregisters"
          type="button"
          className="btn btn-secondary"
          style={style}
        >
          Cancelar
        </Link>

        <button onClick={savePeople} type="button" className="btn btn-primary">
          Salvar
        </button>
      </div>
    </div>
  ) : (
    <Login />
  );
};
