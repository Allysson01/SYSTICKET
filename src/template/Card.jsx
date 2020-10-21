import "../assets/css/custom.css";
import React from "react";
import {Link} from "react-router-dom";

export default (props) => {
  const style = {
    backgroundColor: props.color || "#F00",
    borderColor: props.color || "#F00",
    color: props.color || "#F00",
  };
  const href = props.href || '#/about'

  return (
    <div className={props.class} style={style}>
      <Link to={href}>
        <div className="Content">{props.children}</div>
      </Link>
    </div>
  );
};
