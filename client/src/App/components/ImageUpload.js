import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class ImageUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.File id="formcheck-api-custom" custom>
                        <Form.File.Input isValid />
                        <Form.File.Label data-browse="Button text">
                            Upload image zip
                        </Form.File.Label>
                        <Form.Control.Feedback type="valid">
                            Uploaded!
                        </Form.Control.Feedback>
                    </Form.File>
                </Form.Group>
            </Form>
        );
    }
}
export default ImageUpload;
