import { useHistory } from "react-router-dom";
import "../assets/css/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Img from "./images";
import { Link, Redirect } from "react-router-dom";
import StoreContext from "../store/Context";
import React, { useContext } from "react";
import { useIdleTimer } from "react-idle-timer";

const Menu = React.memo((props) => {
  const { setToken } = useContext(StoreContext);
  const { setName } = useContext(StoreContext);
  const { name } = useContext(StoreContext);
  const { setId } = useContext(StoreContext);
  const { isManager } = useContext(StoreContext);
  const { id } = useContext(StoreContext);
  const history = useHistory();

  const handleOnIdle = (event) => {
    alert("Você foi desconectado");
    handleClick();
  };

  useIdleTimer({
    timeout: 2000000,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  function handleClick(e) {
    e.preventDefault();
    setToken("token", "");
    setName("name", "");
    setId("id", 0);
    history.replace();
    return <Redirect to="/login" />;
  }

  const style = {
    height: "50",
  };

  const Manager = () => {
    if (isManager) {
      return (
        <li>
          <Link to="/lstregisters">
            <i className="fa fa-user" aria-hidden="true"></i> Cadastro
          </Link>
        </li>
      );
    }
  };

  const logo = require("../template/imagens/tg.png");

  return (
    <nav id="idMenu" className="navbar navbar-inverse bg-inverse">
      <div id="menu">
        <div className="navbar-header" style={style}>
          <div
            className="form-group"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              color: "#FFFFFF",
              marginTop: "12px",
            }}
          >
            <div className="col-sm-3">
              <Img img={logo} class="imgMenu" />
            </div>
            <div className="col-sm-5" style={{ marginTop: "5px" }}>
              Telegestão
            </div>
          </div>
        </div>

        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/todos">
                <i className="fa fa-tasks" aria-hidden="true"></i> Tarefas
              </Link>
            </li>
            {Manager()}
            <li>
              <Link to="/about">
                {" "}
                Sobre <i className="fa fa-question" aria-hidden="true"></i>
              </Link>
            </li>
          </ul>
          <div id="pageUser">
            <ul className="nav navbar-nav">
              <li>
                <Link to={`/userpage/:${id}`}>
                  <i className="fa fa-user" aria-hidden="true"></i> {name}
                </Link>
              </li>
              <li>
                <a href="/login" onClick={handleClick}>
                  Sair{" "}
                  <i
                    className="fa fa-arrow-circle-o-right"
                    aria-hidden="true"
                  ></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Menu;
