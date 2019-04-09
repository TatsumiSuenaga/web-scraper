import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {

  constructor(props){
    super(props);
    this.state = { 
      url: '',
      search: ''
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event){
    
  }

  render() {
    return (
      <div className="App">
          <h1>Url Web Scraper</h1>
          <Link to={'./resultTable'}>
            <form>
              <label>URL</label>
              <input type="text" name="url" onChange={this.handleChange} />

              <label>Search word</label>
              <input type="text" name="search" onChange={this.handleChange} />
              <button variant="raised" onSubmit={this.handleSubmit}>
                Search
            </button>
            </form>
          </Link>
      </div>
    );
  }
}

export default Main;
