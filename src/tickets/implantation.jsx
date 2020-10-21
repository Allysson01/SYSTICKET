import React, { useState, useContext } from "react";
import StoreContext from "../store/Context";
import FadeIn from "../template/fadeIn";
import PageHeader from "../template/pageHeader";
import "../assets/css/custom.css";
import Grid from "../template/grid";
import Priority from "../template/priority";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Login from "../login/login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useHistory } from "react-router-dom";
import FileBase64 from "react-file-base64";
import bse64 from "../arquivosJS/file64";
import conexAPI from "../arquivosJS/post";

const URL = "https://localhost:44318/api/tickets/ticketpost";

function initialState() {
  return {
    subject: "",
    client: "",
    view: "",
    description: "",
    priority: 1,
  };
}

let fileBase64 = [];
function handleFiles(files) {
  fileBase64 = bse64(files);  
}

export default () => {
  const [state, setState] = useState(initialState);
  const { id } = useContext(StoreContext);
  const { token } = useContext(StoreContext);
  const { setToken } = useContext(StoreContext);
  const { setName } = useContext(StoreContext);
  const { setId } = useContext(StoreContext);
  const history = useHistory();

  async function saveImplantation(e) {
    e.preventDefault();

    if (!state.subject || !state.description || !state.view || !state.client) {
      return toast.error("Todos os campos são obrigatórios!");
    }
    const type = 2;

    const ticketData = {
      Assunto: state.subject,
      Descricao: state.description,
      Tela: state.view,
      TipoId: type,
      PrioridadeId: parseInt(state.priority),
      Validation: token,
      PersonId: id,
      Cliente: state.client,
      FileBase64: fileBase64,
    };
    const result = await conexAPI(URL, ticketData);
    
        if (result[0].isValidDate) {
          setState({
            ...state,
            view: "",
            subject: "",
            description: "",
            client: "",
          });
          fileBase64 = [];
          toast.success("Ticket salvo com sucesso!");
        } else {
          setState({
            ...state,
            view: "",
            subject: "",
            description: "",
            client: "",
          });
          fileBase64 = [];
          toast.error(result[0].message);
          setTimeout(function() {
            setToken("token", "");
            setName("name", "");
            setId("id", 0);
            return history.push("*");
          }, 6000);
        }
      
  }

  //Função para receber o valor do campo input e alterar o estado
  function sbjChange(e) {
    setState({ ...state, subject: e.target.value });
  }

  function cliChange(e) {
    setState({ ...state, client: e.target.value });
  }

  function viewChange(e) {
    setState({ ...state, view: e.target.value });
  }

  function descChange(e) {
    setState({ ...state, description: e.target.value });
  }

  function setPriority(e) {
    setState({ ...state, priority: e.target.value });
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
        <title>Ticket Implantação </title>
      </Helmet>
      <ToastContainer />
      {/* <Menu></Menu> */}
      <FadeIn>
        <PageHeader
          name="Implantação"
          isColor="#00FF00"
          isHidden="false"
        ></PageHeader>
        <div className="borderContent">
          <div className="form-group">
            <div className="col-sm-10">
              <Grid cols="12">
                <div className="form-group" style={lbStyle}>
                  <div className="col-sm-2">
                    <label className="inpLabel">Assunto:</label>
                  </div>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="assuntoId"
                      className="form-control"
                      placeholder="Ex: Adicionar coluna no relatório indivídual"
                      onChange={sbjChange}
                      value={state.subject}
                    />
                  </div>
                </div>
              </Grid>

              <Grid cols="12">
                <div className="form-group" style={lbStyle}>
                  <div className="col-sm-2">
                    <label className="inpLabel">Cliente:</label>
                  </div>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="inpClient"
                      className="form-control"
                      placeholder="Ex.:103-Totvs"
                      onChange={cliChange}
                      value={state.client}
                    />
                  </div>
                </div>
              </Grid>

              <Grid cols="12">
                <div className="form-group" style={lbStyle}>
                  <div className="col-sm-2">
                    <label className="inpLabel">Tela:</label>
                  </div>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="inpView"
                      className="form-control"
                      placeholder="Ex.: Relatório Individual"
                      onChange={viewChange}
                      value={state.view}
                    />
                  </div>
                </div>
              </Grid>

              <Grid cols="12">
                <div className="form-group" style={lbStyle}>
                  <div className="col-sm-2">
                    <label className="inpLabel">
                      Arquivo: <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-sm-10">
                    <div className="form-control">
                      <FileBase64 multiple={true} onDone={handleFiles} />
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid cols="12">
                <div className="form-group" style={lbStyle}>
                  <div className="col-sm-2">
                    <label className="inpLabel">Descrição:</label>
                  </div>
                  <div className="col-sm-10">
                    <textarea
                      id="inpDados"
                      className="form-control"
                      placeholder="Ex.: Preciso da coluna de parcelamento na 3° posição do relatório"
                      rows="4"
                      onChange={descChange}
                      value={state.description}
                    />
                  </div>
                </div>
              </Grid>
            </div>
            <div className="col-sm-2">
              <Priority priority={state.priority} prioChange={setPriority} />
            </div>
          </div>
        </div>
        <div className="btnSaveOrCancel">
          <Link
            to="/todos"
            type="button"
            className="btn btn-secondary"
            style={style}
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={saveImplantation}
          >
            Salvar
          </button>
        </div>
      </FadeIn>
    </div>
  ) : (
    <Login />
  );
};
