import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userAction from '../actions/userAction';

class App extends Component {
  
  componentDidMount(){
    this.props.userActionFunction();
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

// Direct access to application state by using mapStateToProps. 
// But props are read only. But to modify use bindActionCreators.
// As state changes are made only by reducers

function mapStateToProps(state){
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    userActionFunction: userAction
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
