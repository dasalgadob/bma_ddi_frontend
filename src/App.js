import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Interviews from './views/interviews/index.js';


function App() {
  return (
    <div className="App">
      <nav>
      <Link to="/interviews">Interviews</Link>
      </nav>
      <div>
        <Route path="/interviews" component={Interviews} />
      </div>
    </div>
  );
}

export default App;
