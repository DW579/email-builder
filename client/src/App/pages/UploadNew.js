import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import DropdownOptions from "../components/DropdownOptions";
import Textarea from "../components/Textarea";
import ImageUpload from "../components/ImageUpload";

// Sub components for UploadNew page

// Main exported component
class UploadNew extends Component {
    // Initialize the state
    constructor(props) {
        super(props);

        this.handleClientSelection = this.handleClientSelection.bind(this);
        this.handleSectionSelection = this.handleSectionSelection.bind(this);

        // this variable is what will be the middle man between the button click below and calling the function handleNextButton() below. Step 2/3
        this.handleNextButton = this.handleNextButton.bind(this);

        this.state = {
            client_names: [],
            section_names: [],
            client_name: "Please Select Client",
            section_name: "Please Select Section",
            client_selected: false,
            section_selected: false,
            button: "Review",
        };
    }

    // Fetch all clients
    componentDidMount = () => {
        this.getAllClients();
        this.getAllSections();
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

    // Retrieves all sections from the Express backend and target client names
    getAllSections = () => {
        fetch("/api/getAllSections")
            .then((res) => res.json())
            .then((sections) => {
                let section_names = [];

                // Loop to get only client names
                for (let i = 0; i < sections.length; i++) {
                    section_names.push(sections[i].name);
                }

                // Return only client names
                return section_names;
            })
            .then((section_names) => this.setState({ section_names }));
    };

    // When a client is selected, change state
    handleClientSelection(client_name) {
        this.setState({
            client_name: client_name,
            client_selected: true,
        });
    }

    // When a section is selected, change state
    handleSectionSelection(section_name) {
        this.setState({
            section_name: section_name,
            section_selected: true,
        });
    }

    // This is the function that will be called when the button click happens and the state at top knows where to go. Step 3/3
    handleNextButton(e) {
        console.log("next button");
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>{this.state.client_name}</h1>
                        <DropdownOptions
                            title={"Select client"}
                            options={this.state.client_names}
                            onOptionSelection={this.handleClientSelection}
                        ></DropdownOptions>
                    </Col>
                    <Col>
                        <h1>{this.state.section_name}</h1>
                        <DropdownOptions
                            title={"Select section"}
                            options={this.state.section_names}
                            onOptionSelection={this.handleSectionSelection}
                        ></DropdownOptions>
                    </Col>
                    <Col>
                        <ImageUpload></ImageUpload>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Textarea
                            title={"Paste HTML Here"}
                        ></Textarea>
                    </Col>
                    <Col>
                        <Textarea
                            title={"Paste CSS Here"}
                        ></Textarea>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* Button onClick calls this.handleNextButton in the state at top. Step 1/3 */}
                        <Button
                            variant="primary"
                            onClick={this.handleNextButton}
                        >
                            {this.state.button}
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default UploadNew;
