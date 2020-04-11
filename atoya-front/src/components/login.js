import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Logo from '../Captura.PNG';
import sha256 from 'js-sha256';

class Login extends Component {
    state = {
        confirmed: false
    }
    validateLogin = (e) => {
        e.preventDefault();
        console.log(e.target.elements.usr.value);
        console.log(sha256(e.target.elements.pw.value));
        this.setState({ confirmed: true });
    }

    redirection = () => {
        if (this.state.confirmed === true) {
            return (<Redirect push to="/form" />);
        }
    }

    render() {
        return (
            <Container fluid className="d-flex h-100">
                <Row className="align-items-center h-100 w-100">
                    <Col className="mx-auto text-center">
                        <Container>
                            <Row>
                                <Col><Image src={Logo} fluid /></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form onSubmit={(e) => this.validateLogin(e)}>
                                        <Form.Group controlId="usr">
                                            <Form.Label>Usuario</Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>
                                        <Form.Group controlId="pw">
                                            <Form.Label>Contraseña</Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Ingresar
                                        </Button>
                                    </Form>
                                    {this.redirection()}
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