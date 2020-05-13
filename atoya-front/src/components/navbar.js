import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import './styles/navbar.css';
export default class navbar extends Component {
  cerrarSesion = () => {
    localStorage.removeItem("token");
    this.props.history.push('/');
  }
  render() {
    return (
      <Menu >
        <strong id="navb-title">ATOYA BACKOFFICE</strong>
        <a id="formularios" className="menu-item justify-content-between" href="/main">
        <i className="fas fa-align-left"></i> Formularios
        </a>
        <a id="recordatorios" className="menu-item" href="/reminders">
        <i className="fas fa-bell"></i> Recordatorios
        </a>
        <a id="usuarios" className="menu-item" href="/register">
        <i className="fas fa-user-friends"></i> Usuarios
        </a>
        <a id="logout" className="menu-item" onClick={this.cerrarSesion}>
        <i className="fas fa-door-open"></i> Cerrar sesión
        </a>
      </Menu>
    );
  }
}
