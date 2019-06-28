import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Interviews from './views/interviews/index.js';
import Login from './views/users/Login';
import Users from './views/users/Users';
import SignUp from './views/users/SignUp';
import Results from './views/results/Results';

function App() {
  return (
    <div className="App">
      <nav>
      <Link to="/results">Resultados</Link>
      <Link to="/interviews">Interviews</Link>
      <Link to="/login">Login</Link>
      <Link to="/users">Users</Link>
      <Link to="/sign_up">Sign up</Link>
      </nav>
      <div>
      <Route path="/results" component={Results} />
        <Route path="/interviews" component={Interviews} />
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
        <Route path="/sign_up" component={SignUp} />
      </div>
    </div>
  );
}

export default App;
