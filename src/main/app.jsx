import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/custom.css";
import Routes from "./routes";
import StoreProvider from "../store/provider";
import React  from "react";


export default (props) => {
  // const RenderMenu = <Menu />;
  const RenderRotas = <Routes />;  
  
  return (
    <div>
      <StoreProvider>{RenderRotas}</StoreProvider>
    </div>
  );
};
