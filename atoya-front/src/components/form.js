import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card, Table, Modal } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import "./styles/form.css";

class Formulario extends Component {
    constructor() {
        super();
        this.handleInitialDateChange = this.handleInitialDateChange.bind(this);
        this.handleFinalDateChange = this.handleFinalDateChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.state = {
            fecha: new Date(),
            initialDate: new Date(),
            finalDate: new Date(),
            finalDisabled: true,
            materials: [],
            revisions: ["Eléctrico","Calibración","Mecánico","Capacitación","Cambio Partes","Limpieza","Actualización","Pruebas"]
        }
    }
    
    handleInitialDateChange = (initialDate) => {
        console.log(initialDate);
        this.setState({ initialDate });
    }

    handleFinalDateChange = (finalDate) => {
        console.log(finalDate);
        this.setState({ finalDate });
    }

    handleShow=()=>{
        this.setState({
            show : true
        });
    }

    handleClose = () =>{
        this.setState({
            show: false
        });
    }

    handleSubmit = (e) => {
        var data = {reference: document.getElementById("ref").value, description: document.getElementById("desc").value, units: document.getElementById("cant").value};
        this.setState((prevState) => ({
           materials: [...prevState.materials, data]
        }));
        this.handleClose();
    }

    handlePost = () => {
        var envio = {};
        envio["form"] = {};
        envio["form"]["description"] = document.getElementById("descripcion").value;
        envio["form"]["physic_unit"] = document.getElementById("fisica").value;
        envio["form"]["equipment"] = document.getElementById("equipo").value;
        envio["form"]["serial_number"] = document.getElementById("serial").value;
        envio["form"]["reference"] = document.getElementById("referencia").value;
        envio["form"]["observations"] = document.getElementById("observaciones").value;
        envio["form"]["pending_observations"] = document.getElementById("pendientes").value;
        envio["form"]["type"] = "Tintometria";
        envio["form"]["beginning_hour"] = this.state.initialDate.toString();
        envio["form"]["finishing_hour"] = this.state.finalDate.toString();
        envio["form"]["vfn"] = document.getElementById("chk9").checked;
        envio["form"]["vft"] = document.getElementById("chk10").checked; 
        envio["form"]["vnt"] = document.getElementById("chk11").checked; 
        envio["form"]["ups_dosing"] = document.getElementById("chk12").checked;
        envio["form"]["officer"] = document.getElementById("responsable").value;
        var revisions = "";
        for (let index = 1; index < 8; index++) {
            if(document.getElementById("chk"+index).checked === true){
                revisions += this.state.revisions[index-1] + ";";
            }
        }
        if(revisions[revisions.length-1] === ";"){
            revisions = revisions.substring(0, revisions.length - 1);
        }
        envio["form"]["revisions"] = revisions;
        envio["materials"] = this.state.materials;
        envio["client"] = {}
        envio["client"]["name"] = document.getElementById("solicita").value;
        envio["client"]["city"] = document.getElementById("ciudad").value;
        envio["client"]["email"] = "email@gmail.com";
        envio["client"]["enterprise"] = document.getElementById("cliente").value;
        envio["planning_order"] = {}
        envio["planning_order"]["activities"] = document.getElementById("act").checked;
        envio["planning_order"]["responsabilitites"] = document.getElementById("rep").checked;
        envio["planning_order"]["considerations"] = document.getElementById("ele").checked;
        envio["planning_order"]["observations"] = document.getElementById("aditobs").value;
        envio["planning_order"]["officer"] = document.getElementById("responsable").value;
        
        console.log(envio);
        if(localStorage.getItem("token") != null){
            axios.post("http://localhost:5000/form", envio, {headers:{'Content-Type': 'application/json','Authorization': localStorage.getItem("token")}})
                .then(res =>{
                    console.log(res);
                })
                .catch(err =>{
                    console.log(err);
                })
        }
        else {
            console.log("NO HAY TOKEN VALIDO");
        }
    }

    botonForm = () => {
        return (
            <>
                <tr className="text-center"><td key={"0"} colSpan="3" onClick={() => this.handleShow()}>Agregar</td></tr>
                <Modal size="lg" show={this.state.show} onHide={this.handleClose} centered ref={this.wrapper}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Material/Repuesto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="ref">
                                <Form.Label>Referencia</Form.Label>
                                <Form.Control />
                            </Form.Group>
                            <Form.Group controlId="desc">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control />
                            </Form.Group>
                            <Form.Group controlId="cant">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control type="number" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Cancelar</Button>
                        <Button variant="success"onClick={this.handleSubmit}>Crear taller</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    tablelist = () => {
        let final = [];
        for (let index = 0; index < this.state.materials.length; index++) {
            const element = this.state.materials[index];
            final.push(
                <tr className="text-center">
                    <td>{element.reference}</td>
                    <td>{element.description}</td>
                    <td>{element.units}</td>
                </tr>
            );
        }
        final.push(this.botonForm());
        return final;
    }

    render() {
        return (
            <>
            <Container className="createForm" id="page-wrap">
                <Card className="shadow-lg" id="formu">
                    <Card.Body>
                    <Row>
                    <Col>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="cliente">
                                    <Form.Label>Cliente</Form.Label>
                                    <Form.Control  required/>
                                    <Form.Control.Feedback type="invalid">Por favor llena este campo</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="ciudad">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Control required/>
                                    <Form.Control.Feedback type="invalid">Por favor llena este campo</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="solicita">
                                <Form.Label>Solicita</Form.Label>
                                <Form.Control required/>
                                <Form.Control.Feedback type="invalid">Por favor llena este campo</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="descripcion">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control required/>
                                <Form.Control.Feedback type="invalid">Por favor llena este campo</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="fisica">
                                    <Form.Label>Unidad Física</Form.Label>
                                    <Form.Control required/>
                                    <Form.Control.Feedback type="invalid">Por favor llena este campo</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="equipo">
                                    <Form.Label>Equipo</Form.Label>
                                    <Form.Control required/>
                                    <Form.Control.Feedback type="invalid">Por favor llena este campo</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="serial">
                                    <Form.Label>Serial</Form.Label>
                                    <Form.Control required/>
                                    <Form.Control.Feedback type="invalid">Por favor llena este campo</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="referencia">
                                    <Form.Label>Referencia</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>Revisiones y trabajos efectuados</Card.Header>
                            <Card.Body>
                                <Form className="text-center">
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="chk1">
                                            <Form.Check inline type="checkbox" label="Eléctrico" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="chk2">
                                            <Form.Check inline type="checkbox" label="Calibración" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="chk3">
                                            <Form.Check inline type="checkbox" label="Mecánico" />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="chk4">
                                            <Form.Check inline type="checkbox" label="Capacitación" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="chk5">
                                            <Form.Check inline type="checkbox" label="Cambio Partes" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="chk6">
                                            <Form.Check inline type="checkbox" label="Limpieza" />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="chk7">
                                            <Form.Check inline type="checkbox" label="Actualización" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="chk8">
                                            <Form.Check inline type="checkbox" label="Pruebas" />
                                        </Form.Group>
                                    </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>Materiales y repuestos</Card.Header>
                            <Card.Body>
                                <Table striped bordered hover responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>Referencia</th>
                                            <th>Descripción</th>
                                            <th>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.tablelist().map((e) => {
                                            return e;
                                        })}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col>
                        <Form className="text-center">
                            <Form.Row>
                                <Form.Group as={Col} controlId="chk9">
                                    <Form.Check inline type="switch" label="VFN" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="chk10">
                                    <Form.Check inline type="switch" label="VFT" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="chk11">
                                    <Form.Check inline type="switch" label="VNT" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="chk12">
                                    <Form.Check inline type="switch" label="Dosificador" />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form className="text-center">
                            <Form.Row>
                                <Form.Group as={Col} controlId="chk13">
                                    <Form.Label>Hora inicial</Form.Label>
                                    <br/>
                                    <DateTimePicker onChange={this.handleInitialDateChange} value={this.state.initialDate} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="chk14">
                                    <Form.Label>Hora final</Form.Label>
                                    <br/>
                                    <DateTimePicker onChange={this.handleFinalDateChange} value={this.state.finalDate}/>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="observaciones">
                                <Form.Label>Observaciones</Form.Label>
                                <Form.Control as="textarea" rows="3" />
                            </Form.Group>
                            <Form.Group controlId="pendientes">
                                <Form.Label>Pendientes</Form.Label>
                                <Form.Control as="textarea" rows="3" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="h-100">
                            <Card.Header>Actividades de ejecución a planear</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="act">
                                        <Form.Check inline type="switch" label="Anotar seriales, revisión eléctrica, mecánica, limpieza y pruebas de funcionamiento, lubricación y nivelación" />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="h-100">
                            <Card.Header>Repuestos y herramientas necesarios para alistar</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="rep">
                                        <Form.Check inline type="switch" label="Herramienta de mano, soplador, aceite, paño limpieza, silicona, repuestos como fusibles, bombillos, tornillera, porta espuma, válvula, tarjetas, sellos, correos, etc." />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="h-100">
                            <Card.Header>Elementos de seguridad, permisos y procedimientos a considerar</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="ele">
                                        <Form.Check inline type="switch" label="Guantes, botas de seguridad, uniforme, reporte pago seguridad social actualizados, informe, entrar por funcionarios, buen trato al cliente, enviar excesos de confianza, realizas inspección visual previa de trabajo" />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="aditobs">
                                <Form.Label>Observaciones adicionales</Form.Label>
                                <Form.Control as="textarea" rows="3" />
                            </Form.Group>
                            <Form.Group controlId="responsable">
                                <Form.Label>Responsable</Form.Label>
                                <Form.Control/>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <button className="btn atoyaButton" onClick={this.handlePost}>
                            Crear
                        </button>
                    </Col>
                </Row>
                    </Card.Body>
                </Card>
            </Container>
            </>
        );
    }
}

export default Formulario;