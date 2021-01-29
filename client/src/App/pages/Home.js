import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardTile from '../components/CardTile';


class Home extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <CardTile></CardTile>
          </Col>
          <Col>
            <CardTile></CardTile>
          </Col>
          <Col>
            <CardTile></CardTile>
          </Col>
          <Col>
            <CardTile></CardTile>
          </Col>
        </Row>
      </Container>
    // <div className="App">
    //   <h1>Project Home</h1>
    //   <Link to={'./build'}>
    //     <button variant="raised">
    //         Build page
    //     </button>
    //   </Link>
    //   <Link to={'./test'}>
    //     <button variant="raised">
    //         Test page
    //     </button>
    //   </Link>
    //   <Link to={'./upload'}>
    //     <button variant="raised">
    //         Upload page
    //     </button>
    //   </Link>
    //   <Link to={'./download'}>
    //     <button variant="raised">
    //         Download page
    //     </button>
    //   </Link>
    // </div>

    );
  }
}
export default Home;
