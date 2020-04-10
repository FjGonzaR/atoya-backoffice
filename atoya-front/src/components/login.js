import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Login extends Component {
    render() {
        return (
            <Container fluid className="d-flex h-100">
                <Row className="align-items-center h-100 w-100">
                    <Col className="mx-auto text-center">
                        <Container>
                            <Row>
                                <Col>Atoya</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Usuario</Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Contraseña</Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>
                                        <Link to="/form">
                                            <Button variant="primary" type="submit">
                                                Ingresar
                                            </Button>
                                        </Link>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;