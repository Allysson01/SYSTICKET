import React from "react";
import PageHeader from "../template/pageHeader";
import "../assets/css/custom.css";

export default (props) => {
  let classModal = !props.modalShow ? "mostrarModalTarget" : "mostrarModal";

  const lbStyle = {
    marginTop: "10px",
  };

  return (
    <div className={classModal}>
      <div className="innerModal">
        <button onClick={props.closeModal} title="Fechar" className="fechar">
          x
        </button>

        <PageHeader
          name={props.tipo}
          isColor={props.cor}
          isHidden="false"
          icon="fa fa-ticket"
        />
        <div className="form-group">
          <div className="col-sm-9 subject">
            <font size="5">{props.subject} </font>
          </div>

          <div className="col-sm-9" style={{ marginTop: 15 }}>
            {props.desc}
          </div>

          <div className="col-sm-3">            
            <div className="inBorder" onChange={props.prioChange}>
              <label className="inpLabel col-sm-12">
                <font size="5" color="#FF025d">
                  PRIORIDADE:
                </font>
              </label>
              <div className="col-sm-12">
                <input type="radio" defaultChecked />{" "}
                <label className="inpLabel" style={lbStyle}>
                  {" "}
                  {props.priority}
                </label>
              </div>
            </div>
          </div>
        </div>        
      </div>
    </div>
  );
};
