import React from 'react';
import { Route, Router } from 'react-router-dom';
import Formulario from './components/form';
import Login from './components/login';
import Main from './components/main';
import Register from './components/register';
import history from './history';

export const makeMainRoutes = () => {
    return (
        <Router history={history}>
            <Route exact path="/" render={(props) => <Login {...props}/>} />
            <Route path="/form" render={(props) => <Formulario {...props}/>} />
            <Route path="/register" render={(props) => <Register {...props}/>} />
            <Route path="/main" render={(props) => <Main {...props}/>} />
        </Router>
    );
}
