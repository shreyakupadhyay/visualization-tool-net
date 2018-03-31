import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Home from './components/Home/home';

const routes = (
    <Route exact path='/' component={Home} />
    <Route exact path='/dashboard' component={Dashboard} />
)