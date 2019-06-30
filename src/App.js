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
          <Route path="/results/:id" component={Result} />
          <Route path="/results" component={Results} />
          <Route path="/interviews" component={Interviews} />
          <Route path="/login" component={Login} />
          <Route path="/users" component={Users} />
          <Route path="/sign_up" component={SignUp} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
