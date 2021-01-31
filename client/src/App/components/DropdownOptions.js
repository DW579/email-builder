import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

class DropdownOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            options: props.options,
        };
    }

    // Update state.options
    updateOptions(nextOptions) {
        this.setState({
            options: nextOptions,
        });
    }

    // When client name data is received, re-render the component to display client options in drop down
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.options !== this.state.options) {
            this.updateOptions(nextProps.options);

            return true;
        }

        return false;
    }

    render() {
        // If options have not come in yet, show loading screen. Else show real UI
        if (this.state.options.length === 0) {
            return (
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Loading...
                </Button>
            );
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
