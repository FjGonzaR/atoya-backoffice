import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import { Image } from 'react-bootstrap';
import Logo from "../Captura.PNG";
import './styles/navbar.css';
export default class navbar extends Component {
  cerrarSesion = () => {
    localStorage.removeItem("token");
    this.props.history.push('/');
  }
  render() {
    return (
      <Menu >
        <strong>ATOYA BACKOFFICE</strong>
        <a id="home" className="menu-item" href="/main">
          Formularios
        </a>
        <a id="about" className="menu-item" href="/about">
          Recordatorios
        </a>
        <a id="about" className="menu-item" href="/register">
          Usuarios
        </a>
        <a id="about" className="menu-item" onClick={this.cerrarSesion}>
          Cerrar Sesion
        </a>
      </Menu>
    );
  }
}
