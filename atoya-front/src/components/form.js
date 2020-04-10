import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card, Table, Modal } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';

class Formulario extends Component {
    constructor() {
        super();
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            fecha: new Date()
        }
    }
    
    handleTimeChange = (fecha) => {
        console.log(fecha);   // <- prints "3600" if "01:00" is picked
        this.setState({ fecha });
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

    handleSubmit(e) {
        var data = {ref: document.getElementById("ref").value, desc: document.getElementById("desc").value, cant: document.getElementById("cant").value};
        console.log(data);
        this.handleClose();
    }

    botonForm = () => {
        return (
            <>
                <td key={"0"} colSpan="3" onClick={() => this.handleShow()}>Agregar</td>
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
        final.push(this.botonForm());
        return final;
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
                <br />
                <br />
                <Row>
                    <Col>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="cliente">
                                    <Form.Label>Cliente</Form.Label>
                                    <Form.Control />
                                </Form.Group>

                                <Form.Group as={Col} controlId="ciudad">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="solicita">
                                <Form.Label>Solicita</Form.Label>
                                <Form.Control />
                            </Form.Group>

                            <Form.Group controlId="descripcion">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="fisica">
                                    <Form.Label>Unidad Física</Form.Label>
                                    <Form.Control />
                                </Form.Group>

                                <Form.Group as={Col} controlId="equipo">
                                    <Form.Label>Equipo</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="serial">
                                    <Form.Label>Serial</Form.Label>
                                    <Form.Control />
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
                                        <Form.Group as={Col} controlId="chk4">
                                            <Form.Check inline type="checkbox" label="Actualización" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="chk5">
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
                                        <tr className="text-center">
                                            {this.tablelist().map((e) => {
                                                return e;
                                            })}
                                        </tr>
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
                                    <Form.Check inline type="checkbox" label="VFN" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="chk10">
                                    <Form.Check inline type="checkbox" label="VFT" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="chk11">
                                    <Form.Check inline type="checkbox" label="VNT" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="chk12">
                                    <Form.Check inline type="checkbox" label="Dosificador" />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col>
                        <Form className="text-center">
                            <Form.Row>
                                <Form.Group as={Col} controlId="chk13">
                                    <DateTimePicker onChange={this.handleTimeChange} value={this.state.fecha} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="chk14">
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="observaciones">
                                <Form.Label>Observaciones</Form.Label>
                                <Form.Control rows="3" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Formulario;