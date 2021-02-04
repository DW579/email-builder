import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class Textarea extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            title: props.title,
            text: "",
            valid: false
        };
    }

    handleChange(e) {
        console.log(e.target.textContent)
        this.setState({
            valid: true,
            text: e.target.textContent
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
