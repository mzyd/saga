import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { increment } from './actions'

class App extends Component {
  state = {
    counter: 0
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p> Edit <code>src/App.js</code> and save to reload. </p>
        </header>
        <p className="App-intro">
          { this.props.counter }
        </p>
        <p>
          <button onClick={ this.props.increment }>+</button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
}


export default connect(mapStateToProps, { increment })(App)
