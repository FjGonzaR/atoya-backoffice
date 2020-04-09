import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Formulario from './form';
import Login from './login';

class Main extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/form" component={Formulario}/>
        </Switch>
      </Router>
    );
  }
}

export default Main;