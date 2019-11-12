import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faTable, faRedo, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import {  Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import './../../css/Menu.css';

function MenuList() {

    const { t, i18n } = useTranslation();

    return (<div className="bs-glyphicons">
    <ul className="bs-glyphicons-list">

      <li>
        <Link to='interviews' className="">
            <FontAwesomeIcon icon={faUserFriends} size="6x" className="icon-blue" ></FontAwesomeIcon> 
            <h4><span className="glyphicon-className icon-blue">{t('interviews.title_lower')}
          </span></h4>
        </Link>
        
      </li>
      <li>
        <Link to='results' className="">
            <FontAwesomeIcon icon={faTable} size="6x" className="icon-gray" ></FontAwesomeIcon> 
            <h4><span className="glyphicon-className icon-gray">{t('results_lower')}
          </span></h4>
        </Link>
        
      </li>
      <li>
        <Link to='renewalsList' className="">
            <FontAwesomeIcon icon={faRedo} size="6x" className="icon-brown" ></FontAwesomeIcon> 
            <h4><span className="glyphicon-className icon-brown">{t('renewals.title')}
          </span></h4>
        </Link>
        
      </li>
  
      <li>
        <Link to='settings' className="">
            <FontAwesomeIcon icon={faCogs} size="6x" className="icon-black" ></FontAwesomeIcon> 
            <h4><span className="glyphicon-className icon-black">{t('settings.title')}
          </span></h4>
        </Link>
        
      </li>
    </ul>
  </div>);
}


export default withTranslation()(MenuList); 