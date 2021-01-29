import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Tile extends Component {
    render() {
      return (
      <div className="App">
        <Link to={'./build'}>
          <button variant="raised">
              Tile
          </button>
        </Link>
      </div>
      );
    }
  }
  export default Tile;