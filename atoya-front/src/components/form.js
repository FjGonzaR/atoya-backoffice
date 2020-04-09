import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card, Table, Modal } from 'react-bootstrap';

class Formulario extends Component {
    state = {
        fecha: new Date()
    }

    deployMateriales = () => {
        return <></>;
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs={6} style={{ fontSize: "300%" }}>
                        A T O Y A
                    </Col>
                    <Col xs={6} className="text-right" style={{ fontSize: "300%" }}>
                        Fecha: {this.state.fecha.getUTCDate() + "/" + (this.state.fecha.getUTCMonth() + 1) + "/" + this.state.fecha.getFullYear()}
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

                                <Form.Group as={Col} controlId="ref">
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
                                            <td colSpan="3" onClick={this.deployMateriales}>Agregar</td>
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
            </Container>
        );
    }
}

export default Formulario;