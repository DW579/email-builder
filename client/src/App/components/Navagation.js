import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Navagation extends Component {
    render() {
      return (
        <Nav activeKey="/">
          <Nav.Item>
            {/* <Nav.Link href="/">
              <Image src="https://emailimages1.blob.core.windows.net/hotwireimages/oracle_logo.jpg" fluid />
            </Nav.Link> */}
          </Nav.Item>
          <NavDropdown title="Dropdown" id="nav-dropdown">
            <NavDropdown.Item href="/">Home</NavDropdown.Item>
            <NavDropdown.Item href="/build">Build</NavDropdown.Item>
            <NavDropdown.Item href="/test">Test</NavDropdown.Item>
            <NavDropdown.Item href="/upload">Upload</NavDropdown.Item>
            <NavDropdown.Item href="/download">Download</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    }
  }
  export default Navagation;