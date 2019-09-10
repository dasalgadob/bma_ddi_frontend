import React from "react";
import {Redirect, Route} from 'react-router-dom'; 
const axios = require('axios');

const VALIDATE_TOKEN_URL =`${process.env.REACT_APP_BACKEND_URL}/auth/validate_token`;
async function validToken(){
  let user = JSON.parse(localStorage.getItem('user'));
  console.log("uid:" + user.uid);
  console.log("uid:" + user["access-token"]);
  console.log("uid:" + user.client);
  let method = 'get';
        let self = this;
        
  console.log("VALIDATE_TOKEN_URL:" + VALIDATE_TOKEN_URL);
  let answer = await axios({
      method: method,
      url: `${VALIDATE_TOKEN_URL}`,
      headers: user,
      body: {
        "uid": user.uid,
        "access-token": user["access-token"],
        "client": user.client
      }
      })
  .then(function (response) {
      // handle success
      console.log("validToken");
      console.log(response.data);
      if(response.data.success){
        console.log("true");
        return true;
      }else{
        console.log("false");
        localStorage.removeItem("user");
        return false;
      }
  })
  .catch(function (error) {
      // handle error
      localStorage.removeItem("user");
      console.log(error);
      return false;
  });
  await console.log("answer:");
  console.log(answer);
  return  answer;
}

export const  PrivateRoute = ({ component: Component, ...rest }) =>
     (
      <Route
        {...rest}
        render={props => 
          localStorage.getItem('user') && validToken() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );