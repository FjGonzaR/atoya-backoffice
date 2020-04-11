import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  ListGroup,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./main.css";


class Main extends Component {
  state = {
    fecha: new Date(),
  };
  render() {
    return (
      <>
        <Navbar className="justify-content-between">
          <Navbar.Brand href="/">
            <strong>Atoya BackOffice</strong>
          </Navbar.Brand>
        </Navbar>
        <Container>
          <br />
          <br />
          <ListGroup className="listaEducacion">
            <ListGroup.Item className="itemHover">
              <Row className="justify-content-center text-center">
                <Col xs={8}>
                  <h1>04/02/2020 - Empresa1</h1>
                </Col>
                <Col xs={2}>
                  <Button variant="primary">Descargar PDF</Button>
                </Col>
                <Col xs={2}>
                  <Button variant="secondary">Enviar correo</Button>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="itemHover">
              <Row className="justify-content-center text-center">
                <Col xs={8}>
                  <h1>04/02/2020 - Empresa2</h1>
                </Col>
                <Col xs={2}>
                  <Button variant="primary">Descargar PDF</Button>
                </Col>
                <Col xs={2}>
                  <Button variant="secondary">Enviar correo</Button>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="itemHover">
              <Row className="justify-content-center text-center">
                <Col xs={8}>
                  <h1>04/02/2020 - Empresa3</h1>
                </Col>
                <Col xs={2}>
                  <Button variant="primary">Descargar PDF</Button>
                </Col>
                <Col xs={2}>
                  <Button variant="secondary">Enviar correo</Button>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="itemHover">
              <Row className="justify-content-center text-center">
                <Col xs={8}>
                  <h1>04/02/2020 - Empresa4</h1>
                </Col>
                <Col xs={2}>
                  <Button variant="primary">Descargar PDF</Button>
                </Col>
                <Col xs={2}>
                  <Button variant="secondary">Enviar correo</Button>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="itemHover">
              <Row className="justify-content-center text-center">
                <Col xs={8}>
                  <h1>04/02/2020 - Empresa5</h1>
                </Col>
                <Col xs={2}>
                  <Button variant="primary">Descargar PDF</Button>
                </Col>
                <Col xs={2}>
                  <Button variant="secondary">Enviar correo</Button>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <br />
          <br />
          <Row className="justify-content-center text-center">
            <Col>
              <Link to="/form">
                <Button variant="primary">Crear Formulario</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Main;
