import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownOptions from "../components/DropdownOptions"

class UploadNew extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <DropdownOptions
                            title={""}
                            clients={["Hotwire", "Harley", "AT&T"]}
                        ></DropdownOptions>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default UploadNew;