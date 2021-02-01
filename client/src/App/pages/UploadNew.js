import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import DropdownOptions from "../components/DropdownOptions";
import Dropdown from "react-bootstrap/esm/Dropdown";

// Sub components for UploadNew page

// Main exported component
class UploadNew extends Component {
    // Initialize the state
    constructor(props) {
        super(props);

        this.handleClientSelection = this.handleClientSelection.bind(this);

        this.state = {
            client_names: [],
            selected_client: "No Client Selected",
        };
    }

    // Fetch all clients
    componentDidMount = () => {
        this.getAllClients();
    };

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

    // When a client is selected, change state
    handleClientSelection(client_name) {
        this.setState({
            selected_client: client_name,
        });
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>{this.state.selected_client}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* Select client dropdown */}
                        <DropdownOptions
                            title={"Select client"}
                            options={this.state.client_names}
                            onOptionSelection={this.handleClientSelection}
                        ></DropdownOptions>

                        {/* Select section dropdown */}

                        {/* Paste HTML */}

                        {/* Paste CSS */}

                        {/* Upload images */}

                        {/* Review */}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary">Next</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default UploadNew;
