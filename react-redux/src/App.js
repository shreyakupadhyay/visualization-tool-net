import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userAction from './actions/userAction';
import Home from './components/home';


import Linechart from './components/linechart';
//material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  
  componentDidMount(){
    this.props.userActionFunction();
  }
  
  render() {
    return (
      <MuiThemeProvider>
        <Home />
      </MuiThemeProvider>
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
