import React from 'react';
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


function App() {
  return (
    <div className="App">
      <Header></Header>
      <nav>
      <Link to="/login">Login</Link>
      <Link to="/users">Users</Link>
      <Link to="/sign_up">Sign up</Link>
      </nav>
      <div>
        <Switch>
          <PrivateRoute path="/results/:id" component={Result} />
          <PrivateRoute path="/results" component={Results} />
          <PrivateRoute path="/interviews/:id/fill" component={FillInterview} />
          <PrivateRoute path="/interviews/:id" component={Interview} />
          <PrivateRoute path="/interviews/new" component={NewInterview} />
          <PrivateRoute exact path="/interviews" component={Interviews} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/users" component={Users} />
          
        </Switch>
      </div>
    </div>
  );
}

export default App;
