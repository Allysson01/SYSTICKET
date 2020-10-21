import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import FadeIn from "react-fade-in";
import Grid from "../template/grid";
import Img from "../template/images";
import Helmet from "react-helmet";
import "../assets/css/custom.css";
import StoreContext from "../store/Context";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const URL = "https://localhost:44318/api/authen/login";

function initialState() {
  return { email: "", password: "" };
}

export default () => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(null);
  const history = useHistory();
  const { setToken } = useContext(StoreContext);
  const { setName } = useContext(StoreContext);
  const { setId } = useContext(StoreContext);
  const { setManager } = useContext(StoreContext);

  function emailChange(e) {
    setState({ ...state, email: e.target.value });
  }

  function passwordChange(e) {
    setState({ ...state, password: e.target.value });
  }

  async function loginOn({ email, password }) {
    if (email === "" || password === "") {
      const warning = document.getElementsByName("required");

      for (var i = 0; i < warning.length; i++) {
        warning[i].hidden = false;
      }
      return { error: "Usuário ou senha inválido" };
    }
    let data = [];

    const params = { email, password };

    await axios
      .post(URL, params)
      .then((resp) => {
        data = resp.data;
      })
      .catch(function(err) {
        console.log(err);
        if (err.toString() === "Error: Network Error") {
          return toast.error(
            "Erro ao invocar API! Por favor informe a TI para solucionar o problema."
          );
        }
      });

    if (data.validation !== false) {
      return {
        token: data.key,
        nome: data.name,
        id: data.id,
        isManager: data.isManager,
      };
    }
    toast.error("Erro ao logar! Verifique Usuário e Senha.");

    return { error: "Usuário ou senha inválido" };
  }

  async function onSubmitt(e) {
    e.preventDefault();
    const { token, nome, id, isManager } = await loginOn(state);
    if (token) {
      setId("id", parseInt(id));
      setToken("token", token);
      setName("name", nome);
      setManager("isManager", isManager);      
      return history.replace("/todos");
    }
    setError(error);
    setState(initialState);
  }
  const keyHandler = (e) => {
    if (e.key === "Enter") {
      onSubmitt(e);
    }
  };

  const lbStyle = {
    marginTop: "10px",
  };
  const logo = require("../template/imagens/tg.png");
  return (
    <FadeIn delay={100} transitionDuration={700}>
      <div hidden className="pageLogin">
        <ToastContainer />
        <Helmet>
          <title>TeleGestão - Login</title>
        </Helmet>

        <div className="boxLogin">
          <Grid cols="12">
            <div className="form-group lgoImg">
              <Img img={logo} class="imgLogin"></Img>
            </div>
          </Grid>

          <Grid cols="12">
            <div className="form-group" style={lbStyle}>
              <div className="col-sm-12">
                <label className="inpLabel">E-mail:</label>
              </div>
              <div className="col-sm-12">
                <input
                  type="text"
                  id="inpEmail"
                  className="form-control"
                  onChange={emailChange}
                  value={state.email}
                  onKeyUp={keyHandler}
                />
                <small name="required" hidden style={{ color: "red" }}>
                  Campo obrigatório
                </small>
              </div>
            </div>
          </Grid>

          <Grid cols="12">
            <div className="form-group" style={lbStyle}>
              <div className="col-sm-12">
                <label className="inpLabel">Senha:</label>
              </div>
              <div className="col-sm-12">
                <input
                  type="password"
                  id="passwordId"
                  className="form-control"
                  onChange={passwordChange}
                  value={state.password}
                  onKeyUp={keyHandler}
                />
                <small name="required" hidden style={{ color: "red" }}>
                  Campo obrigatório
                </small>
              </div>
            </div>
          </Grid>

          <Grid cols="12">
            <div className="form-group" style={lbStyle}>
              <div className="col-sm-12">
                <div style={lbStyle}>
                  <small id="errorLogin" hidden style={{ color: "red" }}>
                    Usuário ou Senha inválido
                  </small>
                </div>
              </div>
            </div>
          </Grid>

          <Grid cols="12">
            <div className="form-group" style={lbStyle}>
              <div className="col-sm-12">
                <div style={lbStyle}>
                  <button
                    className="btn btn-secondary btn-lg btn-block"
                    onClick={onSubmitt}
                  >
                    <i className="fa fa-lock" aria-hidden="true" /> Login
                  </button>
                </div>
              </div>
            </div>
          </Grid>
        </div>
      </div>
    </FadeIn>
  );
};
