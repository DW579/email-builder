import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownOptions from "../components/DropdownOptions";

class Build extends Component {
    constructor(props) {
        super(props);

        this.handleClientSelection = this.handleClientSelection.bind(this);

        this.state = {
            client_names: [],
            client_name: "Please Select Client",
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
            client_name: client_name,
            // client_selected: true,
        });
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Build Page</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>{this.state.client_name}</h1>
                        <DropdownOptions
                            title={"Select client"}
                            options={this.state.client_names}
                            onOptionSelection={this.handleClientSelection}
                        ></DropdownOptions>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Build;
