import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBuilding, faUsers } from '@fortawesome/free-solid-svg-icons';
import {  Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import './../../css/Menu.css';

function MenuSettingsList() {

    const { t, i18n } = useTranslation();

    return (<div className="bs-glyphicons">
    <ul className="bs-glyphicons-list">

      <li>
        <Link to='businessUnits' className="">
            <FontAwesomeIcon icon={faBuilding} size="6x" className="icon-black" ></FontAwesomeIcon> 
            <h4><span className="glyphicon-className icon-black">{t('business_units.title')}
          </span></h4>
        </Link>
        
      </li>
  
      <li>
        <Link to='users' className="">
            <FontAwesomeIcon icon={faUsers} size="6x" className="icon-purple" ></FontAwesomeIcon> 
            <h4><span className="glyphicon-className icon-purple">{t('users.title')}
          </span></h4>
        </Link>
        
      </li>
    </ul>
  </div>);
}


export default withTranslation()(MenuSettingsList); 