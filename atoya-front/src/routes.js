import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Formulario from "./components/form";
import Login from "./components/login";
import Main from "./components/main";
import Register from "./components/register";
import history from "./history";
import Navbar from "./components/navbar";

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={(props) => <Login {...props} />} />
        <Route path="*">
            <div id="outer-container">
            <Navbar  pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }/>
          <Switch id="page-wrap">
            <Route path="/form" render={(props) => <Formulario {...props} />} />
            <Route
              path="/register"
              render={(props) => <Register {...props} />}
            />
            <Route path="/main" render={(props) => <Main {...props} />} />
          </Switch>
            </div>
        </Route>
      </Switch>
    </Router>
  );
};
