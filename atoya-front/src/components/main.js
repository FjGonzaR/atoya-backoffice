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
  constructor() {
    super();
    this.state = {
      fecha: new Date(),
      forms: [],
      formsJSX: undefined
    };
    this.renderForms = this.renderForms.bind(this);
  }

  componentDidMount() {
    axios.get("https://atoya-app.herokuapp.com/forms", { headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem("token") } })
      .then(res => {
        var forms = [];
        res.data.map((e) => {
          forms.push({ id: e.id, client: e.client, created_at: new Date(e.created_at) });
        });
        this.setState({ forms });
        this.setState({ formsJSX:this.renderForms()});
      })
  }

  renderForms = () => {
    var ret = [];
    for (let index = 0; index < this.state.forms.length; index++) {
      const element = this.state.forms[index];
      ret.push(
        <ListGroup.Item key={element.id}>
          <Row className="justify-content-center text-center">
            <Col xs={8}>
              <h1>{element.client.enterprise + " - " + element.client.name + " - " + element.created_at.getDate()+"/"+(element.created_at.getMonth()+1)+"/"+element.created_at.getFullYear()}</h1>
            </Col>
            <Col xs={2}>
              <Button onClick={(e) => this.downloadPDF(e)} id={`a${element.id}`} className="btn atoyaButton">Descargar PDF</Button>
            </Col>
            <Col xs={2}>
              <Button onClick={(e) => this.sendEmail(e)} id={`b${element.id}`} className="btn atoyaButton">Enviar correo</Button>
            </Col>
          </Row>
        </ListGroup.Item>
      );
    }
    return ret;
  }

  downloadPDF = (e) => {
    e.preventDefault();
    if (localStorage.getItem("token") != null) {
      axios.get(`https://atoya-app.herokuapp.com/form/${e.target.id.substring(1,e.target.id.length)}/download`, { headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem("token") }, responseType: 'blob' })
        .then(res => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
          saveAs(pdfBlob, "newPdf.pdf");
        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      console.log("NO HAY TOKEN VALIDO");
      this.props.history.push("/");
    }
  }

  sendEmail = (e) => {
    e.preventDefault();
    if (localStorage.getItem("token") != null) {
      axios.get(`https://atoya-app.herokuapp.com/form/${e.target.id.substring(1,e.target.id.length)}/send`, { headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem("token") }})
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      console.log("NO HAY TOKEN VALIDO");
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <>
        <Container>
          <br />
          <br />
          <Row className="justify-content-center text-center">
            <Col>
              <Link to="/form">
                <Button className="btn atoyaButton">Crear Formulario</Button>
              </Link>
            </Col>
          </Row>
          <br />
          <br />
          <ListGroup className="listaEducacion">
            {this.state.formsJSX}
          </ListGroup>
        </Container>
      </>
    );
  }
}

export default Main;
