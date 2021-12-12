import React, { Component } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../css/style.css';
import inhouse from './InHouse.png';

export default class Home extends Component {
    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <a href="/"><img className="logo" alt="" src={inhouse}></img></a>
                <br></br>
                <br></br>
                <div style={{textAlign: "center"}}>
                    <h1>Welcome to InHouse!</h1>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Container>
                        <Row>
                            <Col>
                                <a href="/reservations"><Button variant="primary" size="lg">
                                    Reservation
                                </Button></a>
                            </Col>
                            <Col>
                                <a href="/walkins"><Button variant="primary" size="lg">
                                    Walk-In
                                </Button></a>
                            </Col>
                            <Col>
                                <a href="/parties"><Button variant="primary" size="lg">
                                    Parties
                                </Button></a>
                            </Col>
                            <Col>
                                <a href = "/tables"><Button variant="primary" size="lg">
                                    Tables
                                </Button></a>
                            </Col>
                        </Row>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Row>
                            <Col>
                                <a href="/waiters"><Button variant="primary" size="lg">
                                    Waiters
                                </Button></a>
                            </Col>
                            <Col>
                                <a href="/orders"><Button variant="primary" size="lg">
                                    Order
                                </Button></a>
                            </Col>
                            <Col>
                                <a href="/menu"><Button variant="primary" size="lg">
                                    Menu
                                </Button></a>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}