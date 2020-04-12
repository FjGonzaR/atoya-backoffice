import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
} from "react-bootstrap";
import axios from 'axios';
import { Link } from "react-router-dom";
import { saveAs } from 'file-saver';
import "./main.css";


class Main extends Component {
  state = {
    fecha: new Date(),
  };

  downloadPDF = () => {
    if (localStorage.getItem("token") != null) {
      axios.get("http://localhost:5000/form/2bc623e3-0e6f-459f-9814-a087ce1cc961/download", { headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem("token") }, responseType: 'blob' })
        .then(res => {
          const pdfBlob = new Blob([res.data], {type:'application/pdf'});
          saveAs(pdfBlob, "newPdf.pdf");
        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      console.log("NO HAY TOKEN VALIDO");
    }
  }

  render() {
    return (
      <>
        <Container>
          <br />
          <br />
          <ListGroup className="listaEducacion">
            <ListGroup.Item action>
              <Row className="justify-content-center text-center">
                <Col xs={8}>
                  <h1>04/02/2020 - Empresa1</h1>
                </Col>
                <Col xs={2}>
                  <Button variant="primary" onClick={this.downloadPDF}>Descargar PDF</Button>
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
