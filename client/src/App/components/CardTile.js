import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

class CardTile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            image: props.image,
            text: props.text,
            link: props.link,
            link_text: props.link_text
        }
    }

    render() {
      return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{this.state.title}</Card.Title>
            </Card.Body>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
                <Card.Text>{this.state.text}</Card.Text>
            </Card.Body>
            <Card.Body>
                <Link to={{pathname: this.state.link}}>{this.state.link_text}</Link>
            </Card.Body>
        </Card>
      );
    }
  }
  export default CardTile;