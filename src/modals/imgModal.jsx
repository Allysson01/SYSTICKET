import React from "react";
import { Modal } from "react-bootstrap";
import Carr from "./imgCarousel";
import "../assets/css/custom.css";

export default (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      style={{
        color: "#FFFFFF",
        backgroundColor: "#1c1c1c",
        borderBottom: "1px solid #000000",
      }}
    >
      <div>
        <Carr lstt={props.lstm}></Carr>
      </div>
      <div
        style={{
          textAlign: "right",
          color: "#FFFFFF",
          backgroundColor: "#1c1c1c",
          borderTop: "1px solid #000000",
          padding: "15px",
        }}
      >
        <button className="styleButton" onClick={props.onHide}>
          Fechar
        </button>
      </div>
    </Modal>
  );
};
