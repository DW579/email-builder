import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class Textarea extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            title: props.title,
            valid: false
        };
    }

    handleChange(e) {
        this.setState({
            valid: true
        });
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>{this.state.title}</Form.Label>
                    <Form.Control as="textarea" rows={12} isValid={this.state.valid} onChange={this.handleChange}></Form.Control>
                    <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                </Form.Group>
            </Form>
        );
    }
}
export default Textarea;
