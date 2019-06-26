
import React, { Component } from 'react';

export default class Login extends Component{
    render(){
        return (
            <div className="container ">
                <div className="row justify-content-center">
        <div className="text-center">
            <form className="form-signin">
            <br></br>
            <h1 className="h3 mb-3 font-weight-normal">Ingresar</h1>
            <label for="inputEmail" className="sr-only">Email</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus></input>
            <label for="inputPassword" className="sr-only">Contraseña</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required></input>
            <div className="checkbox mb-3">
                <label>
                <input type="checkbox" value="remember-me"></input>Recordarme
                </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-muted">&copy; 2019</p>
            </form>
        </div>
        </div>
        </div>
  );
    }
}
