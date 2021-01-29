import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            <NavDropdown.Item>
              <Link to={'./'}>Home</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to={'./build'}>Build</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to={'./test'}>Test</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
             <Link to={'./upload'}>Upload</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to={'./download'}>Download</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    }
  }
  export default Navagation;