import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';
import 'bootstrap/dist/css/bootstrap.min.css';
import {makeMainRoutes} from './routes';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);