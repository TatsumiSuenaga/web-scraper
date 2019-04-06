import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <div className="App">
          <h1>Url Web Scraper</h1>
          <Link to={'./resultTable'}>
            <button variant="raised">
                Search
            </button>
          </Link>
      </div>
    );
  }
}

export default Main;
