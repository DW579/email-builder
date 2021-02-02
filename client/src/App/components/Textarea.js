import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class Textarea extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Paste HTML Here</Form.Label>
                    <Form.Control as="textarea" rows={12}></Form.Control>
                </Form.Group>
            </Form>
        );
    }
}
export default Textarea;
