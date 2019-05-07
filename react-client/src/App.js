import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute';
import { Home } from './components/Home/Home';
import { NavBar } from './components/NavBar//NavBar';
import { loginProps, registerProps } from './constants/userForm';
import SignForm from './components/Authentication/SignForm';
import TablePage from './components/Pages/TablePage/TablePage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import ChartPage from './components/Pages/ChartPage/ChartPage';
import authService from './services/AuthService';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path='/login' render={() => {
              authService.logout();
              return <SignForm data = {loginProps} />;
            }
            } />
            <Route path='/register' render={() => {
              authService.logout();
              return <SignForm data = {registerProps} />;
            }
            } />
            <PrivateRoute path="/home" component={Home}/>
            <PrivateRoute path="/table" component={TablePage}/>
            <PrivateRoute path="/chart" component={ChartPage}/>
            <Redirect exact from="/" to="/home"/>
            <Route path="/*" component={ErrorPage}/>
          </Switch>
        </div>  
      </Router>
    );
  }
}

export default App;
