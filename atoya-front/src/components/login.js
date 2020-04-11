import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Card,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./styles/login.css";
import Logo from "../Captura.PNG";
import axios from "axios";

class Login extends Component {
  state = {
    confirmed: false,
  };
  validateLogin = (e) => {
    e.preventDefault();
    // console.log(e.target.elements.usr.value);
    // console.log(sha256(e.target.elements.pw.value));
    const response = axios
      .post("http://localhost:5000/login", {
        email: e.target.elements.usr.value,
        password: e.target.elements.pw.value,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        console.log(localStorage.getItem("token"));
        this.setState({ confirmed: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  redirection = () => {
    if (this.state.confirmed === true) {
      return <Redirect push to="/main" />;
    }
  };

  render() {
    return (
      <Container className="d-flex align-items-center justify-content-center flex-column fullDimensions">
        <Card className="cardShadow shadow-lg ">
          <Card.Body>
          <Image src={Logo} fluid style={{ maxWidth: 400 }} />
            <Form onSubmit={(e) => this.validateLogin(e)} className="d-flex flex-column justify-content-center">
              <Form.Group controlId="usr">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Ingrese su correo"/>
              </Form.Group>
              <Form.Group controlId="pw">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <Button className="atoyaButton" type="submit">
                Ingresar
              </Button>
            </Form>
          </Card.Body>
        </Card>
        {this.redirection()}
      </Container>
    );
  }
}

export default Login;
