import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownOptions from "../components/DropdownOptions";

class UploadNew extends Component {
    // Initialize the state
    constructor(props) {
        super(props);
        this.state = {
            client_names: [],
        };
    }

    // Fetch all clients
    componentDidMount() {
        this.getAllClients();
    }

    // Retrieves all clients from the Express backend and target client names
    getAllClients = () => {
        fetch("/api/getAllClients")
            .then((res) => res.json())
            .then((clients) => {
                let client_names = [];

                // Loop to get only client names
                for (let i = 0; i < clients.length; i++) {
                    client_names.push(clients[i].name);
                }

                // Return only client names
                return client_names;
            })
            .then((client_names) => this.setState({ client_names }));
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <DropdownOptions
                            title={"Select Client"}
                            options={this.state.client_names}
                        ></DropdownOptions>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default UploadNew;
