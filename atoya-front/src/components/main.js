import React, { Component } from 'react';
import { Container, Row, Col, Image, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './main.css';

class Main extends Component {
  state = {
    fecha: new Date()
  }
  render() {
    return (
      <Container>
        <Row>
          <Col xs={6} style={{ fontSize: "300%" }}>
            A T O Y A
          </Col>
          <Col xs={6} className="text-right" style={{ fontSize: "300%" }}>
            Fecha: {this.state.fecha.getDate() + "/" + (this.state.fecha.getMonth() + 1) + "/" + this.state.fecha.getFullYear()}
          </Col>
        </Row>
        <br/>
        <br/>
        <ListGroup className="listaEducacion">
          <ListGroup.Item className="itemHover">
            <h1>Encargo #1</h1>
          </ListGroup.Item>
          <ListGroup.Item className="itemHover">
            <h1>Encargo #2</h1>
          </ListGroup.Item>
          <ListGroup.Item className="itemHover">
            <h1>Encargo #3</h1>
          </ListGroup.Item>
          <ListGroup.Item className="itemHover">
            <h1>Encargo #4</h1>
          </ListGroup.Item>
          <ListGroup.Item className="itemHover">
            <h1>Encargo #5</h1>
          </ListGroup.Item>
        </ListGroup>
        <br/>
        <br/>
        <Row className="justify-content-center text-center">
          <Col>
            <Link to="/form">
              <Button variant="primary">
                Crear Formulario
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;