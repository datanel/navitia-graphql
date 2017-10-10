import React, { Component } from 'react';
import NetworkList from './NetworkList';
import CoverageList from './CoverageList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCoverage: 'fr-idf'
    }
  }

  handleClick = (coverage) => {
      this.setState({
        selectedCoverage: coverage
      });
  }

  render() {
    return (
      <div className="App">
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Navitia GraphQL
              </h1>
              <h2 className="subtitle">
                Playing with navitia.io and GraphQL
              </h2>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns is-mobile">
              <div className="column">
                <CoverageList handleClick={this.handleClick} selectedCoverage={this.state.selectedCoverage}/>
              </div>
              <div className="column">
                <NetworkList coverage={this.state.selectedCoverage} />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
