import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import {Logout} from '../../helpers/Auth';

export default class Header extends Component{
render(){
    const navStyle = {
        backgroundColor: 'rgb(40,53,147)'
    };

    const dropdownStyle = {
        left: "0px"
    }

    return <nav className="navbar navbar-expand-md navbar-dark" style={navStyle}>
    <div className="navbar-collapse collapse  dual-collapse2">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            <NavLink to="/interviews" className="nav-link" activeClassName="active">Entrevistas</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/results" className="nav-link" activeClassName="active">Resultados</NavLink>
            </li>
        </ul>
    </div>
    <div className="mx-auto">
        <a className="navbar-brand mx-auto" href="#">BMAGroup</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
            <span className="navbar-toggler-icon"></span>
        </button>
    </div>
    <div className="navbar-collapse collapse  dual-collapse2">
        <ul className="navbar-nav  ml-auto">
        <li className="nav-item dropdown mr-2">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Español
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="#">Ingles</a>
            </div>
        </li>
        <li className="nav-item dropdown" style={dropdownStyle}>
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Cuenta
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="#">Perfil</a>
            <a className="dropdown-item" href="#">Configuraciones</a>
            <div className="dropdown-divider"></div>
            <Logout />
            </div>
        </li>
        </ul>
    </div>
</nav>;
}

}