import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return (
    <div className="App">
      <h1>Project Home</h1>
      <Link to={'./build'}>
        <button variant="raised">
            Build page
        </button>
      </Link>
      <Link to={'./test'}>
        <button variant="raised">
            Test page
        </button>
      </Link>
      <Link to={'./upload'}>
        <button variant="raised">
            Upload page
        </button>
      </Link>
      <Link to={'./download'}>
        <button variant="raised">
            Download page
        </button>
      </Link>
    </div>
    );
  }
}
export default Home;
