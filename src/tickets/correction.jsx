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

function subjState() {
  return { subject: "" };
}

function clientState() {
  return { client: "" };
}

function viewState() {
  return { view: "" };
}

function descState() {
  return { description: "" };
}

function priorityState() {
  return { priority: 1 };
}

let fileBase64 = [];
function handleFiles(files) {
  fileBase64 = bse64(files);
}

export default React.memo(() => {
  const [subject, setSubject] = useState(subjState);
  const [client, setClient] = useState(clientState);
  const [view, setView] = useState(viewState);
  const [description, setDesc] = useState(descState);
  const [priority, setPrio] = useState(priorityState);
  const { id } = useContext(StoreContext);
  const { setToken } = useContext(StoreContext);
  const { setName } = useContext(StoreContext);
  const { setId } = useContext(StoreContext);
  const { token } = useContext(StoreContext);
  const history = useHistory();

  async function saveCorrection(e) {
    e.preventDefault();

    if (
      !subject.subject ||
      !description.description ||
      !view.view ||
      !client.client
    ) {
      return toast.error("Todos os campos são obrigatórios!");
    }
    const type = 1;

    const ticketData = {
      Assunto: subject.subject,
      Cliente: client.client,
      Descricao: description.description,
      Tela: view.view,
      TipoId: type,
      PrioridadeId: parseInt(priority.priority),
      Validation: token,
      PersonId: id,
      FileBase64: fileBase64,
    };

    const result = await conexAPI(URL, ticketData);
    
    if (result[0].isValidDate) {
      setView({ ...view, view: "" });
      setSubject({ ...subject, subject: "" });
      setDesc({ ...description, description: "" });
      setClient({ ...client, client: "" });
      fileBase64 = [];
      toast.success("Ticket salvo com sucesso!");
    } else {
      setView({ ...view, view: "" });
      setSubject({ ...subject, subject: "" });
      setDesc({ ...description, description: "" });
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
    setSubject({ ...subject, subject: e.target.value });
  }

  function cliChange(e) {
    setClient({ client: e.target.value });
  }

  function viewChange(e) {
    setView({ ...view, view: e.target.value });
  }

  function descChange(e) {
    setDesc({ ...description, description: e.target.value });
  }

  function setPriority(e) {
    setPrio({ ...priority, priority: e.target.value });
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
        <title>Ticket Correção</title>
      </Helmet>
      <ToastContainer />
      <FadeIn>
        <PageHeader
          name="Correção"
          isColor="#FF8C00"
          isHidden="false"
        ></PageHeader>
        <div className="borderContent">
          <div className="form-group" style={lbStyle}>
            <div className="col-sm-10">
              <Grid cols="12">
                <div className="form-group">
                  <div className="col-sm-2">
                    <label className="inpLabel">Assunto: </label>
                  </div>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="assuntoId"
                      className="form-control"
                      placeholder="Ex.: Erro ao exportar usuário de telefonia"
                      onChange={sbjChange}
                      value={subject.subject}
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
                      value={client.client}
                    />
                  </div>
                </div>
              </Grid>

              <Grid cols="12">
                <div className="form-group" style={lbStyle}>
                  <div className="col-sm-2">
                    <label className="inpLabel">Tela: </label>
                  </div>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="inpView"
                      className="form-control"
                      placeholder="Ex.: Usuário de Telefonia"
                      onChange={viewChange}
                      value={view.view}
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
                    <label className="inpLabel">Descrição: </label>
                  </div>
                  <div className="col-sm-10">
                    <textarea
                      id="inpDados"
                      className="form-control"
                      placeholder="Ex.: Tela fica branca ao exportar"
                      rows="4"
                      onChange={descChange}
                      value={description.description}
                    />
                  </div>
                </div>
              </Grid>
            </div>
            <div className="col-sm-2">
              <Priority priority={priority.priority} prioChange={setPriority} />
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
            onClick={saveCorrection}
          >
            Salvar
          </button>
        </div>
      </FadeIn>
    </div>
  ) : (
    <Login />
  );
});
