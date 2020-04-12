import React, { Component } from "react";
import { Container, Form, Image, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./styles/login.css";
import Logo from "../Captura.PNG";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class Login extends Component {
  state = {
    confirmed: false,
  };

  validateLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://atoya-app.herokuapp.com/login", {
        email: e.target.elements.usr.value,
        password: e.target.elements.pw.value,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        this.setState({ confirmed: true });
      })
      .catch((err) => {
        toast(`Credenciales incorrectas. Intente de nuevo`, {
          containerId: "A",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  redirection = () => {
    if (this.state.confirmed === true) {
      return <Redirect push to="/main" />;
    }
  };

  render() {
    var bool = true;
    if(localStorage.getItem("token") != null){
      axios.get("https://atoya-app.herokuapp.com/", {headers:{'Content-Type': 'application/json','Authorization': localStorage.getItem("token")}})
        .then((res) =>{
          console.log("activo");
          bool = false;
          this.props.history.push("/main");
        });
    }
    if (bool) {
      return (
        <Container className="d-flex align-items-center justify-content-center flex-column fullDimensions">
          <ToastContainer
            enableMultiContainer
            containerId={"A"}
            position="bottom-right"
            autoClose={2400}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          <Card className="cardShadow shadow-lg ">
            <Card.Body>
              <Image src={Logo} fluid style={{ maxWidth: 400 }} />
              <Form
                onSubmit={(e) => this.validateLogin(e)}
                className="d-flex flex-column justify-content-center"
              >
                <Form.Group controlId="usr">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Ingrese su correo" />
                </Form.Group>
                <Form.Group controlId="pw">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
                <button className="btn atoyaButton" type="submit">
                  Ingresar
                </button>
              </Form>
            </Card.Body>
          </Card>
          {this.redirection()}
        </Container>
      );
    }
  }
}

export default Login;
