import React, { Component } from 'react';
import { Container, Row, Col, Button, Card, Badge, Form, Modal } from "react-bootstrap";
import axios from "axios";
import "./styles/reminders.css";
import DateTimePicker from "react-datetime-picker";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

class Reminders extends Component {
    constructor() {
        super();
        this.state = {
            modo: 1,
            rems: {},
            remsJSX: undefined,
            fechaCrear: new Date(),
            fechaModificar: new Date(),
            currentEditElement: {title:"", description:"", due_date:new Date().toString()}
        }
        this.dropdownChange = this.dropdownChange.bind(this);
    }

    handleCreateDateChange = (fechaCrear) => {
        this.setState({ fechaCrear });
    }

    handleUpdateDateChange = (fechaModificar) => {
        this.setState({ fechaModificar });
    }

    componentDidMount() {
        if (localStorage.getItem("token") == null) {
            this.props.history.push("/");
        }
        axios.get("https://atoya-app.herokuapp.com/reminders", {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
            },
        })
        .then((res) => {
            this.setState({ rems: res.data }, () => {
                this.renderReminders();
            });
        })
        .catch((err) => {
            console.log(err);
            this.props.history.push("/");
        });
    }

    dropdownChange = (e) => {
        this.setState({ modo: parseInt(e.target.value) }, () => {
            this.renderReminders();
        });
    }

    editReminder = (e) => {
        var data = { title: document.getElementById("edtit").value, description: document.getElementById("eddesc").value, due_date: this.state.fechaModificar};
        if(localStorage.getItem("token") != null){
            axios.put(`https://atoya-app.herokuapp.com/reminder/${this.state.currentEditElement.id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                this.componentDidMount();
                this.renderReminders();
                toast(`Se ha editado el recordatorio exitosamente`, {
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
            this.handleUpdateClose();
        } else {
            console.log("NO HAY TOKEN VALIDO");
            this.props.history.push("/");
        }
    }

    deleteReminder = (e) => {
        e.preventDefault();
        let temp = e.target;
        if(localStorage.getItem("token") != null){
            axios.delete(
                `https://atoya-app.herokuapp.com/reminder/${temp.id.substring(
                1,
                e.target.id.length
                )}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            .then((res) => {
                this.componentDidMount();
                this.renderReminders();
                toast(`Se ha eliminado el recordatorio exitosamente`, {
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
    }

    handleCreateOpen = () => this.setState({showCreate:true});
    handleCreateClose = () => this.setState({showCreate:false});

    handleUpdateOpen = (e) => {
        let tempid = e.target.id.substring(1,e.target.id.length);
        let actual = this.state.rems.all.filter(val => val.id == tempid)[0];
        this.handleUpdateDateChange(new Date(actual.due_date));
        this.setState({showUpdate:true, currentEditElement:actual});
    }

    handleUpdateClose = () => this.setState({showUpdate:false});

    createReminder = () => {
        var data = { title: document.getElementById("tit").value, description: document.getElementById("desc").value, due_date: this.state.fechaCrear};
        if(localStorage.getItem("token") != null){
            axios.post("https://atoya-app.herokuapp.com/reminder", data, { headers: {"Content-Type": "application/json", Authorization: localStorage.getItem("token") } })
            .then(res => {
                this.componentDidMount();
                this.renderReminders();
                toast('¡Recordatorio creado exitosamente!', {
                    containerId: 'A',
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            })
            .catch(err => {
                console.log(err);
                toast(`No se suministró correctamente la información. Intente de nuevo`, {
                    containerId: "A",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
            this.handleCreateClose();
        }
        else{
            console.log("NO HAY TOKEN VALIDO");
            this.props.history.push("/");
        }
    }

    renderReminders = () => {
        let ret = [];
        let mode = [];
        if (this.state.modo == "1") mode = this.state.rems.dued;
        else if (this.state.modo == "2") mode = this.state.rems.soon;
        else mode = this.state.rems.all;
        for (let index = 0; index < mode.length; index++) {
            const element = mode[index];
            ret.push(
                <Card className="reminders" key={element.id}>
                    <Row className="card-body justify-content-between align-items-center text-center">
                        <Col xs={2}>
                            <small>{new Date(element.due_date).toLocaleDateString()}</small>
                            <Badge pill>
                                {element.title}
                            </Badge>
                        </Col>
                        <Col xs={8}>
                            <h1 className="enterprise">{element.description}</h1>
                        </Col>
                        <Col xs={1}>
                            <Button
                                onClick={(e) => this.handleUpdateOpen(e)}
                                id={`a${element.id}`}
                                className="btn atoyaButton"
                            ><i id={`d${element.id}`} className="fas fa-pencil-alt"></i>
                            </Button>
                        </Col>
                        <Col xs={1}>
                            <Button
                                onClick={(e) => this.deleteReminder(e)}
                                id={`b${element.id}`}
                                className="btn atoyaButton"
                            ><i id={`e${element.id}`} className="fas fa-times-circle"></i>
                            </Button>
                        </Col>
                    </Row>
                </Card>
            );
        }
        this.setState({remsJSX:ret});
    }

    render() {
        return (
            <>
                <Container id="remindersContainer">
                    <Card id="formListBody">
                        <Card.Body className="shadow-lg">
                            <Row className="justify-content-center text-center">
                                <Col className="colBotonCrear justify-content-between d-flex">
                                    <strong id="title">Recordatorios</strong>
                                    <div>
                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Control as="select" onChange={e => this.dropdownChange(e)} className="btn atoyaDrop">
                                                <option value="1">Vencidas</option>
                                                <option value="2">A vencer</option>
                                                <option value="3">Todas</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <>
                                            <Button className="btn atoyaButton" onClick={() => this.handleCreateOpen()}>Crear Recordatorio</Button>
                                            <Modal size="lg" show={this.state.showCreate} onHide={this.handleCreateClose} centered ref={this.wrapper}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Agregar Recordatorio</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form onSubmit={this.createReminder}>
                                                        <Form.Group controlId="tit">
                                                            <Form.Label>Titulo</Form.Label>
                                                            <Form.Control />
                                                        </Form.Group>
                                                        <Form.Group controlId="desc">
                                                            <Form.Label>Descripción</Form.Label>
                                                            <Form.Control />
                                                        </Form.Group>
                                                        <Form.Group controlId="dat">
                                                            <Form.Label>Fecha límite</Form.Label>
                                                            <br/>
                                                            <DateTimePicker onChange={this.handleCreateDateChange} value={this.state.fechaCrear} />
                                                        </Form.Group>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={this.handleCreateClose}>Cancelar</Button>
                                                    <Button className="btn atoyaButton" onClick={this.createReminder}>Crear recordatorio</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </>
                                    </div>
                                </Col>
                            </Row>
                            <div className="listaRecordatorios">
                                {this.state.remsJSX}
                                <Modal size="lg" show={this.state.showUpdate} onHide={this.handleUpdateClose} centered ref={this.wrapper}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Modificar Recordatorio</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={this.editReminder}>
                                            <Form.Group controlId="edtit">
                                                <Form.Label>Titulo</Form.Label>
                                                <Form.Control defaultValue={this.state.currentEditElement.title} />
                                            </Form.Group>
                                            <Form.Group controlId="eddesc">
                                                <Form.Label>Descripción</Form.Label>
                                                <Form.Control defaultValue={this.state.currentEditElement.description} />
                                            </Form.Group>
                                            <Form.Group controlId="eddat">
                                                <Form.Label>Fecha límite</Form.Label>
                                                <br/>
                                                <DateTimePicker onChange={this.handleUpdateDateChange} value={this.state.fechaModificar} />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleUpdateClose}>Cancelar</Button>
                                        <Button className="btn atoyaButton" onClick={this.editReminder}>Editar recordatorio</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        );
    }
}

export default Reminders; 