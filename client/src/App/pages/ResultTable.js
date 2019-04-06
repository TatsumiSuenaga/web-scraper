import React, { Component } from 'react';

class ResultTable extends Component {
  constructor(props){
    super(props);
    this.state = {
        result: []
    }
  }

  componentDidMount() {
    this.getResult();
  }

  getResult = () => {
    fetch('/api/getList')
    .then(res => res.json())
    .then(result => this.setState({ result }))
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
