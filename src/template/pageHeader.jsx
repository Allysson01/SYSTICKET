import React from "react";
import "../assets/css/custom.css";
import { Link } from "react-router-dom";

export default (props) => {
  const Hidden = props.isHidden || "hidden";

  const small = <small>{props.small}</small> || "";

  const icon = props.icon || "fa fa-ticket";

  const colors = {
    padding: "10px",
    minHeight: "10px",
    width: "100%",
    maxHeight: "10px",
    border: "1px solid "+props.isColor,
    borderRadius: "5px",
    backgroundColor: props.isColor,
  };
  if (Hidden === "hidden") {
    var hidden = {
      hidden: "hidden",
    };
  }
  const lstUser = () => {
    if (props.adduser) {
      return (
        <div className="form-group col-md-4 col-sm-4">
          <Link to="/register">
            <div className="btnPeople">
              Add novo Usuário{" "}
              <i className="fa fa-user-plus fa-2x btnPeopleAdd"></i>
            </div>
          </Link>
        </div>
      );
    }
  };

  return (
    <header className="page-header">
      <div className="row">
        <div className="form-group">
          <div className="form-group col-md-8 col-sm-8">
            <h2>
              {props.name} {small}
              <span hidden={hidden}>
                <i className={icon} aria-hidden="true"></i>
              </span>
            </h2>
          </div>
          {lstUser()}
        </div>
        <div hidden={hidden} className="form-group col-md-12 col-sm-12">
          <div style={colors} id="ball"></div>
        </div>
      </div>
    </header>
  );
};
