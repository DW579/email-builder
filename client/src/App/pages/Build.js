import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import DropdownOptions from "../components/DropdownOptions";

import "../../App.css";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const zip = new JSZip();

class Build extends Component {
    constructor(props) {
        super(props);

        this.handleClientSelection = this.handleClientSelection.bind(this);

        this.handleOnClick = this.handleOnClick.bind(this);

        // Handle onClick clear button
        this.handleClear = this.handleClear.bind(this);

        // Handle onClick download button
        this.handleDownload = this.handleDownload.bind(this);

        // Manage active states of tabs
        this.handleActiveState = this.handleActiveState.bind(this);

        this.state = {
            client_names: [],
            client_name: "Please Select Client",
            all_tab_disabled: true,
            active_tab: null,
            tab_active_state: {
                header: false,
                nav: false,
                body: false,
                footer: false,
            },
            all_mods: [],
            selected_mods: [],
            disable_download: true
        };
    }

    // Add selected mod into state.selected_mods and disable download button
    handleOnClick(e) {
        let arr = this.state.selected_mods;

        arr.push(e.target.textContent);

        this.setState({
            selected_mods: arr,
            disable_download: false
        });
    }

    // Clear all selected mods
    handleClear() {
        this.setState({
            selected_mods: [],
            disable_download: true
        });
    }

    // Send selected mod names to backend to create and download html file
    handleDownload() {
        // Data to be passed to the backend in POST
        const data = {
            clientName: this.state.client_name,
            selectedMods: this.state.selected_mods
        };

        // Disable download button until successful zip download
        this.setState({
            disable_download: true
        });

        // POST to download html file and receive success state
        fetch("/api/download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        // res is returning as a pending Promise. Using .then on res.json() to run when Promise is done
        .then((res) => res.json()
            .then((value) => {
                // If success is true, then download the zip of the code.html
                if(value.success) {
                    // Undisable download button
                    this.setState({
                        disable_download: false
                    });

                    // Create new file with JSZip and store value.html string into it
                    zip.file("code.html", value.html);

                    // Generate zip file with code.html data and trigger browser download
                    zip.generateAsync({type:"blob"})
                    .then(function(content) {
                        saveAs(content, "code.zip");
                    });
                }
            })
        )
    }

    // Manage active states of tabs function
    handleActiveState(e) {
        const tab_states = {
            header: false,
            nav: false,
            body: false,
            footer: false,
        };

        tab_states[e.target.id] = true;

        this.setState({
            tab_active_state: tab_states,
            active_tab: e.target.id,
        });
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

    // When a client is selected, change state and fetch all mods associated with selected client
    handleClientSelection(client_name) {
        const data = { clientName: client_name };

        this.setState({
            client_name: client_name,
            all_tab_disabled: false,
            selected_mods: [],
            disable_download: true
        });

        // Get mods
        fetch("/api/getAllMods", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                let mod_names = [];

                //Loop to get only mod names
                for (let i = 0; i < data.length; i++) {
                    mod_names.push(data[i].name);
                }

                // Return only mod names
                return mod_names;
            })
            .then((mod_names) => this.setState({ all_mods: mod_names }));
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col className="text-center">
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
                <Row>
                    <Col>
                        <Nav fill variant="tabs">
                            <Nav.Item>
                                <Nav.Link
                                    id="header"
                                    disabled={this.state.all_tab_disabled}
                                    active={this.state.header_tab_active}
                                    onClick={this.handleActiveState}
                                >
                                    Header
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    id="nav"
                                    disabled={this.state.all_tab_disabled}
                                    active={this.state.nav_tab_active}
                                    onClick={this.handleActiveState}
                                >
                                    Nav
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    id="body"
                                    disabled={this.state.all_tab_disabled}
                                    active={this.state.body_tab_active}
                                    onClick={this.handleActiveState}
                                >
                                    Body
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    id="footer"
                                    disabled={this.state.all_tab_disabled}
                                    active={this.state.footer_tab_active}
                                    onClick={this.handleActiveState}
                                >
                                    Footer
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        {this.state.all_mods.map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={this.handleOnClick}
                                    className="div-mod"
                                >
                                    {value}
                                </div>
                            );
                        })}
                    </Col>
                    <Col>
                        <h2>Selected mods</h2>
                        {this.state.selected_mods.map((value, index) => {
                            return <div key={index}>{value}</div>;
                        })}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="warning" onClick={this.handleClear}>
                            Clear
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={this.handleDownload} disabled={this.state.disable_download}>
                            Download
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Build;
