import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardTile from "../components/CardTile";

class Home extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <CardTile
                            title={"Build"}
                            image={""}
                            text={"Build a new email with pre built modules"}
                            link={"./build"}
                            link_text={"Start Build"}
                        ></CardTile>
                    </Col>
                    <Col>
                        <CardTile
                            title={"Test"}
                            image={""}
                            text={"Automated email testing"}
                            link={"./test"}
                            link_text={"Start Test"}
                        ></CardTile>
                    </Col>
                    <Col>
                        <CardTile
                            title={"Upload"}
                            image={""}
                            text={"Upload new mods. Edit mods. Delete mods."}
                            link={"./upload"}
                            link_text={"Start Upload"}
                        ></CardTile>
                    </Col>
                    <Col>
                        <CardTile
                            title={"Download"}
                            image={""}
                            text={"Download client libraries"}
                            link={"./download"}
                            link_text={"Start Download"}
                        ></CardTile>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Home;
