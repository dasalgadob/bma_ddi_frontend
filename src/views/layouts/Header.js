import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import Logout from '../../helpers/Auth';
import { withTranslation } from 'react-i18next';

 class Header extends Component{
    constructor(props){
        super(props);

        this.state = {
            isSpanish: true 
        };
    }

    changeLanguage = () => {
        this.props.i18n.changeLanguage(this.state.isSpanish?"en":"es");
        this.setState({isSpanish: !this.state.isSpanish});
    }

render(){
    const { t, i18n } = this.props;
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
            <NavLink to="/interviews" className="nav-link" activeClassName="active">{t('interviews.title_lower')}</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/results" className="nav-link" activeClassName="active">{t('results')}</NavLink>
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
            <a className="nav-link dropdown-toggle" 
            href="#" id="navbarDropdownMenuLink" 
            role="button" 
            data-toggle="dropdown" 
            aria-haspopup="true" 
            aria-expanded="false"
            >
            {this.state.isSpanish?"Español":"English"}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="#"
            onClick={() => this.changeLanguage()}>{this.state.isSpanish?"English":"Español"}</a>
            </div>
        </li>
        <li className="nav-item dropdown" style={dropdownStyle}>
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {t('account')}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="#">{t('profile')}</a>
            <a className="dropdown-item" href="#">{t('settings')}</a>
            <div className="dropdown-divider"></div>
            <Logout />
            </div>
        </li>
        </ul>
    </div>
</nav>;
}

}

export default withTranslation()(Header);