import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";


    function logout(){
        console.log("Remove");
        localStorage.removeItem('user');
    }


export const Logout = withRouter(
    
    ({ history }) =>
       (
      
          <button className="dropdown-item"
            onClick={() => {
              logout();
              history.push("/login")
            }}
          >
            Log out
          </button>
      ) 
  );
  