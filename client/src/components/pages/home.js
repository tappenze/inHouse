import React, { Component } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../css/style.css';

export default class Home extends Component {
    render() {
        return (
            <div>
                <br></br>
                <h1>Welcome to InHouse!</h1>
                <br></br>
                <br></br>
                <br></br>
                <Container>
                    <Row>
                        <Col>
                            <Button variant="primary" size="lg">
                                Reservation
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="primary" size="lg">
                                Walk-In
                            </Button>
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
                            <Button variant="primary" size="lg">
                                Waiters
                            </Button>
                        </Col>
                        <Col>
                            <a href="/order"><Button variant="primary" size="lg">
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
        );
    }
}