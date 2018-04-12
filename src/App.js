import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Home from './components/Home/home';
import Loading from './components/Loading/loading';
import Icons from './components/Icons'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
          <MuiThemeProvider>
            <BrowserRouter>
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/dashboard/:id' component={Dashboard} />
                  <Route exact path='/loading' component={Loading} />
                  <Route exact path='/icons' component={Icons} />
              </Switch>
            </BrowserRouter>
          </MuiThemeProvider>
    );
  }
}

export default App;
