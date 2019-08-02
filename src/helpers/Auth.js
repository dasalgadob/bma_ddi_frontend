import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { withTranslation } from 'react-i18next';


    function logout(){
        console.log("Remove");
        localStorage.removeItem('user');
    }


export const Logout = withRouter(
    
    ({ history, t }) =>
       (
      
          <button className="dropdown-item"
            onClick={() => {
              logout();
              history.push("/login")
            }}
          >
            {t('logOut')}
          </button>
      ) 
  );

  export default withTranslation()(Logout);
  