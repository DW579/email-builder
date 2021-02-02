import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

class DropdownOptions extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            title: props.title,
            options: props.options,
            selected_option: null
        };
    }

    handleChange(e) {
        this.props.onOptionSelection(e.target.text);
    }

    // Update state.options
    updateOptions(nextOptions) {
        this.setState({
            options: nextOptions,
        });
    }

    // When client name data is received, re-render the component to display client options in drop down
    shouldComponentUpdate(nextProps, nextState) {
        // When options come into DropdownOption component
        if (nextProps.options !== this.state.options) {
            this.updateOptions(nextProps.options);

            return true;
        }

        return false;
    }

    // Set state.selected_option to user selected option from drop down
    setOption(e) {
        this.setState({
            selected_option: e.target.childNodes[0].data,
        });
    }

    render() {
        // If options have not come in yet, show loading screen. Else show real UI
        if (this.state.options.length === 0) {
            return (
                <Button variant="warning" disabled>
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
                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                        {this.state.title}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {this.state.options.map((value, index) => {
                            return (
                                <Dropdown.Item
                                    key={index}
                                    onClick={this.handleChange}
                                >
                                    {value}
                                </Dropdown.Item>
                            );
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            );
        }
    }
}
export default DropdownOptions;
