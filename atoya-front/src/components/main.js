import React, { Component } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import "./main.css";
import { toast } from 'react-toastify';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      fecha: new Date(),
      forms: [],
      formsJSX: undefined,
    };
    this.renderForms = this.renderForms.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("token") == null) {
      this.props.history.push("/");
    }
    axios
      .get("https://atoya-app.herokuapp.com/forms", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        var forms = [];
        res.data.map((e) => {
          forms.push({
            id: e.id,
            client: e.client,
            created_at: new Date(e.created_at),
            type: e.type,
          });
        });
        this.setState({ forms });
        this.setState({ formsJSX: this.renderForms() });
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/");
      });
  }

  renderForms = () => {
    var ret = [];
    for (let index = 0; index < this.state.forms.length; index++) {
      const element = this.state.forms[index];
      ret.push(
        <Card className="forms" key={element.id}>
          <Row className="card-body justify-content-between align-items-center text-center">
            <Col xs={2}>
              <small>{element.created_at.toLocaleDateString()}</small>
              <Badge pill>
                {element.type}
              </Badge>
            </Col>
            <Col xs={6}>
              <h1 className="enterprise">{element.client.enterprise}</h1>
            </Col>
            <Col xs={2}>
              <Button
                onClick={(e) => this.downloadPDF(e)}
                id={`a${element.id}`}
                className="btn atoyaButton"
              ><i className="fas fa-file-pdf"></i>
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                onClick={(e) => this.sendEmail(e)}
                id={`b${element.id}`}
                className="btn atoyaButton"
              ><i className="fas fa-envelope-open-text"></i>
              </Button>
            </Col>
          </Row>
        </Card>
      );
    }
    //TEMPORAL
    ret.push(
      <Card className="forms" key={"temporal"}>
        <Row className="card-body justify-content-between align-items-center text-center">
          <Col xs={2}>
            <small>{"hoy"}</small>
            <Badge pill>
              {"tipo x"}
            </Badge>
          </Col>
          <Col xs={6}>
            <h1 className="enterprise">{"empresa x"}</h1>
          </Col>
          <Col xs={1}>
            <Button
              id={`a${"aa"}`}
              className="btn atoyaButton"
            ><i className="fas fa-pencil-alt"></i>
            </Button>
          </Col>
          <Col xs={1}>
            <Button
              id={`b${"aa"}`}
              className="btn atoyaButton"
            ><i className="fas fa-envelope-open-text"></i>
            </Button>
          </Col>
          <Col xs={1}>
            <Button
              id={`c${"aa"}`}
              className="btn atoyaButton"
            ><i className="fas fa-file-pdf"></i>
            </Button>
          </Col>
          <Col xs={1}>
            <Button
              id={`d${"aa"}`}
              className="btn atoyaButton"
            ><i className="fas fa-times-circle"></i>
            </Button>
          </Col>
        </Row>
      </Card>
    );
    return ret;
  };

  downloadPDF = (e) => {
    e.preventDefault();
    if (localStorage.getItem("token") != null) {
      axios
        .get(
          `https://atoya-app.herokuapp.com/form/${e.target.id.substring(
            1,
            e.target.id.length
          )}/download`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            responseType: "blob",
          }
        )
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: "application/pdf" });
          saveAs(pdfBlob, "newPdf.pdf");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("NO HAY TOKEN VALIDO");
      this.props.history.push("/");
    }
  };

  sendEmail = (e) => {
    e.preventDefault();
    if (localStorage.getItem("token") != null) {
      axios
        .get(
          `https://atoya-app.herokuapp.com/form/${e.target.id.substring(
            1,
            e.target.id.length
          )}/send`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toast(`Se ha enviado el correo exitosamente`, {
            containerId: "A",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("NO HAY TOKEN VALIDO");
      this.props.history.push("/");
    }
  };

  editRedirect = (e) => {
    e.preventDefault();
    if(localStorage.getItem("token") != null){

    } else {
      console.log("NO HAY TOKEN VALIDO");
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <>
        <Container id="formsContainer">
          <Card id="formListBody">
            <Card.Body className="shadow-lg">
            <Row className="justify-content-center text-center">
            <Col className="colBotonCrear justify-content-between d-flex">
              <strong id="title">Formularios</strong>
              <Link to="/form">
                <Button className="btn atoyaButton">Crear Formulario</Button>
              </Link>
            </Col>
          </Row>
          <div className="listaEducacion">
            {this.renderForms()}
          </div>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
}

export default Main;
