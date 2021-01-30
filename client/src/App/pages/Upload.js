import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardTile from "../components/CardTile";

class Upload extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <CardTile
                            title={"New"}
                            image={""}
                            text={"Create a new mod"}
                            link={"./"}
                            link_text={"Start New"}
                        ></CardTile>
                    </Col>
                    <Col>
                        <CardTile
                            title={"Edit"}
                            image={""}
                            text={"Edit an existing mod"}
                            link={"./"}
                            link_text={"Start Edit"}
                        ></CardTile>
                    </Col>
					<Col>
                        <CardTile
                            title={"Delete"}
                            image={""}
                            text={"Delete a mod"}
                            link={"./"}
                            link_text={"Start Delete"}
                        ></CardTile>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Upload;
