import React, { Component } from 'react';
import {
  Container,
  Form,
  Card,
} from "react-bootstrap";
import './styles/register.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

class Register extends Component {
  state = {
    message: ""
  }
  validateLogin = (e) => {
    e.preventDefault();
    var newmsg = ""
    if (e.target.elements.usr.value.length === 0) {
      newmsg += "El usuario ingresado es inválido\n";
    }
    if (e.target.elements.pw.value.length !== 6 || !e.target.elements.pw.value.match(/^\d+$/)) {
      newmsg += "La contraseña ingresada es inválida\n";
    }
    if (newmsg === "") {
      //crear usuario
      axios
      .post("https://atoya-app.herokuapp.com/signup", {
        email: e.target.elements.usr.value,
        password: e.target.elements.pw.value,
      },
      { headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem("token") } })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        toast(`Usuario registrado con éxito`, {
          containerId: "A",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((err) => {
        toast(`Credenciales inválidas. Intente de nuevo`, {
          containerId: "A",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
    }
    else {
      this.setState({ message: newmsg });
      toast(newmsg, {
        containerId: 'A',
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  }

  render() {
    return (
      <Container className="d-flex align-items-center justify-content-center flex-column fullDimensionsR">
        <Card className="cardShadowR shadow-lg ">
          <Card.Body>
            <Form onSubmit={(e) => this.validateLogin(e)} className="d-flex flex-column justify-content-center">
              <Form.Group controlId="usr">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Ingrese su correo" />
              </Form.Group>
              <Form.Group controlId="pw">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingrese una contraseña de 6 dígitos" />
              </Form.Group>
              <button className="btn atoyaButton" type="submit">
                Crear usuario
                  </button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Register;