import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class ImageUpload extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            label: "Upload image zip",
            valid: false
        };
    }

    handleChange(e) {
        console.log(e.target.files);

        if(e.target.files[0].type === "application/zip") {
            this.setState({
                label: e.target.files[0].name,
                valid: true
            });
        }
        else {
            this.setState({
                label: "Please upload only zip files",
                valid: false
            });
        }

    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.File id="formcheck-api-custom" custom>
                        <Form.File.Input onChange={this.handleChange} isValid={this.state.valid} />
                        <Form.File.Label data-browse="Upload">
                            {this.state.label}
                        </Form.File.Label>
                        <Form.Control.Feedback>
                            Upload Successful!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please upload only zip file format
                        </Form.Control.Feedback>
                    </Form.File>
                </Form.Group>
            </Form>
        );
    }
}
export default ImageUpload;
