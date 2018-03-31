import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Home from './components/Home/home';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
          <MuiThemeProvider>
            <Router>
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/dashboard' component={Dashboard} />
              </Switch>
            </Router>
          </MuiThemeProvider>
    );
  }
}

export default App;
