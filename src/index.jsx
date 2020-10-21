import React from "react";
import ReactDOM from "react-dom";
import App from "./main/app";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/custom.css";


//Pega o App e joga dentro da div app da index.html
ReactDOM.render(<App/>, document.getElementById("app"));
