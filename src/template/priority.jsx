import React from "react";
import "../assets/css/custom.css";


 const Priority = React.memo((props) => {
  const lbStyle = {
    marginTop: "10px",
  };
  return (
    <div className="inBorder" onChange={props.prioChange}>
      <label className="inpLabel col-sm-12">
        <font size="5" color="#FF025d">
          PRIORIDADE:
        </font>
      </label>

      <div className="col-sm-12">
        <input type="radio" name="priorityRadio" value={4} />
        {"  "}
        <label className="inpLabel" style={lbStyle}>
          OVERRIDE{"  "}
          <i
            className="fa fa-exclamation-triangle"
            aria-hidden="true"
            title="Essa opção subscreve outras prioridades suas e precisa de autorização de um gestor TeleGestão "
          ></i>
        </label>
      </div>
      <div className="col-sm-12">
        <input type="radio" name="priorityRadio" value={3} />
        {"  "}
        <label className="inpLabel" style={lbStyle}>
          ALTA
        </label>
      </div>
      <div className="col-sm-12">
        <input type="radio" name="priorityRadio" value={2} />
        {"  "}
        <label className="inpLabel" style={lbStyle}>
          MÉDIA
        </label>
      </div>
      <div className="col-sm-12">
        <input type="radio" name="priorityRadio" defaultChecked value={1} />
        {"  "}
        <label className="inpLabel" style={lbStyle}>
          BAIXA
        </label>
      </div>
    </div>
  );
});

export default Priority;
