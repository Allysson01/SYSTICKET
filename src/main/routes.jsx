import React, { useContext } from "react";
import StoreContext from "../store/Context";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  // useHistory,
  // useLocation,
} from "react-router-dom";

import Todo from "../tarefas/tarefas";
import About from "../about/about";
import Correction from "../tickets/correction";
import Implantation from "../tickets/implantation";
import Charge from "../tickets/charge";
import Register from "../registers/register";
import Login from "../login/login";
import MyTickets from "../tarefas/tarefaslist";
import PrivateRoute from "../Routes/Private/Private";
import LstResgisters from "../registers/lstregisters";
import UserPage from "../registers/userpage";
import Menu from "../template/menu";

//Rotas das views
export default (props) => {
  const { token } = useContext(StoreContext);

  const renderMenu = () => {    
    if (token) {
      return <Menu />;
    }
  };

  return (
    <div>
      <Router>
        <div className="container">{renderMenu()}</div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute path="/todos">
            <Todo />
          </PrivateRoute>

          <PrivateRoute path="/about">
            <About />
          </PrivateRoute>

          <PrivateRoute path="/correction">
            <Correction />
          </PrivateRoute>

          <PrivateRoute path="/implantation">
            <Implantation />
          </PrivateRoute>

          <PrivateRoute path="/charge">
            <Charge />
          </PrivateRoute>

          <PrivateRoute path="/register">
            <Register />
          </PrivateRoute>

          <PrivateRoute path="/mytickets">
            <MyTickets />
          </PrivateRoute>

          <PrivateRoute path="/lstregisters">
            <LstResgisters />
          </PrivateRoute>

          <PrivateRoute path="/userpage/:params">
            <UserPage />
          </PrivateRoute>

          <Redirect from="*" to="/login"></Redirect>
        </Switch>
      </Router>
    </div>
  );
};
