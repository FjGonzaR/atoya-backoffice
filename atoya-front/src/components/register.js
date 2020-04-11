import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Image, Alert } from 'react-bootstrap';
import Logo from '../Captura.PNG';

class Register extends Component {
    state = {
        showAlert: false,
        message: ""
    }
    validateLogin = (e) => {
        e.preventDefault();
        var newmsg = ""
        if (e.target.elements.usr.value.length === 0) {
            newmsg += "El usuario ingresado es inválido\n";
        }
        if (e.target.elements.mail.value.length === 0) {
            newmsg += "El email ingresado es inválido\n";
        }
        if (e.target.elements.pw.value.length !== 8 || !e.target.elements.pw.value.match(/^\d+$/)) {
            newmsg += "La contraseña ingresada es inválida\n";
        }
        if (!(e.target.elements.pw.value === e.target.elements.cpw.value)) {
            newmsg += "Las dos contraseñas no concuerdan\n";
        }
        if (newmsg === "") {
            //crear usuario
            this.props.history.push('/');
        }
        else {
            this.setState({ message: newmsg, showAlert: true });
        }
    }

    changeAlert = (b) => {
        this.setState({ showAlert: b });
    }

    showAlert() {
        if (this.state.showAlert) {
            return (
                <Alert variant="danger" onClose={() => this.changeAlert(false)} dismissible>
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{this.state.message}</p>
                </Alert>
            );
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
                                            <Form.Control placeholder="Username para ingresar a la plataforma" />
                                        </Form.Group>
                                        <Form.Group controlId="mail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Asegurese de tener la estructura 'ejemplo@dominio.com'" />
                                        </Form.Group>
                                        <Form.Group controlId="pw">
                                            <Form.Label>Contraseña</Form.Label>
                                            <Form.Control type="password" placeholder="Debe ser una cadena de exactamente 8 digitos" />
                                        </Form.Group>
                                        <Form.Group controlId="cpw">
                                            <Form.Label>Confirmar contraseña</Form.Label>
                                            <Form.Control type="password" />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Registrarse
                                        </Button>
                                    </Form>
                                    <br/>
                                    <br/>
                                    {this.showAlert()}
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Register;