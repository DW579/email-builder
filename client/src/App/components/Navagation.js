import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            <Link to={'./'}>Home</Link>
            <Link to={'./build'}>Build</Link>
            <Link to={'./test'}>Test</Link>
            <Link to={'./upload'}>Upload</Link>
            <Link to={'./download'}>Download</Link>
          </NavDropdown>
        </Nav>
      );
    }
  }
  export default Navagation;