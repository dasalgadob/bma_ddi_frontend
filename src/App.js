import React, { Component, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import Interviews from './views/interviews/index.js';
import Login from './views/users/Login';
import Users from './views/users/Users';
import SignUp from './views/users/SignUp';
import Results from './views/results/Results';
import Result from './views/results/Result'
import Header from './views/layouts/Header';
import {PrivateRoute} from './helpers/PrivateRoute';
import NewInterview from './views/interviews/NewInterview';
import FillInterview from './views/interviews/FillInterview';
import Interview from './views/interviews/Interview';
import EditUser from './views/users/EditUser';
import NewUser from './views/users/NewUser';
import RenewalsList from './views/renewals';
import  RenewalList from './views/renewals/RenewalList';
import BusinessUnits from './views/business_units';
import  BusinessUnit from './views/business_units/BusinessUnit';

class App extends Component {
  constructor(props){
    super(props);
  }

  

  render(){
  return (
    <Suspense fallback="loading">
    <div className="App">
      <Header></Header>

      <div className="mt-4 ml-3">
        <Switch>
          <PrivateRoute path="/results/:id" component={Result} />
          <PrivateRoute path="/results" component={Results} />
          <PrivateRoute path="/renewalsList/new" component={RenewalList} />
          <PrivateRoute path="/renewalsList" component={RenewalsList} />
          <PrivateRoute path="/businessUnits/new" component={BusinessUnit} />
          <PrivateRoute path="/businessUnits" component={BusinessUnits} />
          <PrivateRoute path="/interviews/:id/fill" component={FillInterview} />
          <PrivateRoute path="/interviews/:id" component={Interview} />
          <PrivateRoute path="/interviews/new" component={NewInterview} />
          <PrivateRoute exact path="/interviews" component={Interviews} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/users/:id/edit" component={NewUser} />
          <PrivateRoute path="/users/new" component={NewUser} />
          <PrivateRoute path="/users" component={Users} />
          
        </Switch>
      </div>
    </div>
    </Suspense>
  );}

}

export default App;
