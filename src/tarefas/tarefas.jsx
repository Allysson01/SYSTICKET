import React, {useContext} from "react";
import StoreContext from "../store/Context";
import PageHeader from "../template/pageHeader";
import "../assets/css/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Helmet from "react-helmet";
import Card from "../template/Card";
import FadeIn from "react-fade-in";
import Login from "../login/login";



export default () => {  
  const { token } = useContext(StoreContext);  

  return token ? (
    <div className="container">
      <Helmet>
        <title>Ticket Tarefas</title>
        <link href="../template/imagens/tg.ico"></link>
      </Helmet>
      <PageHeader name="Tarefas" small="Tickets" isHidden="hidden"></PageHeader>
      <div className="Cards">
        <FadeIn delay={70} transitionDuration={400}>
          <Card href="/correction" class="Card" color="#FF8C00">
            <h2 title="CORREÇÕES">
              <i className="fa fa-ticket" aria-hidden="true"></i> CORREÇÃO
            </h2>
          </Card>
        </FadeIn>
        <FadeIn delay={90} transitionDuration={600}>
          <Card href="/implantation" class="Card" color="#00FF00">
            <h2 title="IMPLANTAÇÃO">
              <i className="fa fa-ticket" aria-hidden="true"></i> IMPLANTAÇÃO
            </h2>
          </Card>
        </FadeIn>
        <FadeIn delay={110} transitionDuration={800}>
          <Card href="/charge" class="Card" color="#6A5ACD">
            <h2 title="CARGA">
              <i className="fa fa-ticket" aria-hidden="true"></i> CARGA
            </h2>
          </Card>
        </FadeIn>
      </div>
      <FadeIn delay={150} transitionDuration={1000}>
        <div className="warning">
          <Card href="/mytickets" class="CardW" color="#2F4F4F">
            <h2>
              <i className="fa fa-list" aria-hidden="true"></i> MEUS TICKETS
            </h2>
          </Card>
        </div>
      </FadeIn>
    </div>
  ) : (
    <Login />
  );
};
