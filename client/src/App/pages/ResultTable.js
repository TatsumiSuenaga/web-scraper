import React, { Component } from 'react';
const axios = require('axios');

class ResultTable extends Component {
  constructor(props){
    super(props);
    this.state = {
        result: []
    }
  }

  getInitialState() {
      const initial = ['loading', 'loading', 'loading', 'loading']; 
      this.setState({ initial });
  }

  componentDidMount() {
    this.getResult();
  }

  getResult = () => {
    // Want to separate the requests, as it is best practice for POST to not return data
    // Thus server cache is updated, then the scrape is initiated
    axios.post('/scrape-init', {
      url: 'https://reddit.com',
      string: 'reddit'
    })
    .then(res => {
      return axios.get('/scrape-url');
    })
    .then(res => {
        res.json();
        console.log('first');
    })
    .then(result => {
        this.setState({ result });
        console.log('second');
    })
    .catch(error => {
        console.log(error);
    });
    // fetch('/scrape-init', {
    //     method: 'post',
    //     body: JSON.stringify({url: 'https://reddit.com', string: 'reddit'})
    // })
    // .then(res => res.json())
    // .then()
    // fetch('/scrape')
    // .then(res => res.json())
    // .then(result => this.setState({ result }));
  }

  render() {
    const { result } = this.state;

    return (
      <div className="App">
        <h1>Table of Results</h1>
        {result.length ? (
          <table>
            <tr>
              <th>Count</th>
              <th>Date</th>
              <th>Search Word</th>
              <th>URL</th>
            </tr>
            <tr>
              {result.map((item) => {
                return(
                  <td>
                    {item}
                  </td>
                );
              })};
            </tr>
          </table>
        ) : (
          <div>
            <h2>No results!</h2>
          </div>
        )
      }
    </div>
    );
  }
}

export default ResultTable;
