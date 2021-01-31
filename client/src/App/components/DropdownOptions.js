import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";

class DropdownOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            clients: props.clients
        };
    }

    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {this.state.title}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {this.state.clients.map((value, index) => {
                        return <Dropdown.Item>{value}</Dropdown.Item>
                    })}
                    {/* <Dropdown.Item href="/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="/action-2">
                        Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="/action-3">
                        Something else
                    </Dropdown.Item> */}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
export default DropdownOptions;
