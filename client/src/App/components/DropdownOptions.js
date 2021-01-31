import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";

class DropdownOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            options: props.options,
        };
    }

    render() {
        // If options have not come in yet, show loading screen. Else show real UI
        if (this.state.options === null) {
            console.log("Not ready");
        } else {
            return (
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {this.state.title}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {this.state.options.map((value, index) => {
                            return (
                                <Dropdown.Item key={index}>
                                    {value}
                                </Dropdown.Item>
                            );
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
}
export default DropdownOptions;
