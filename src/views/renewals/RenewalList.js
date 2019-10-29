import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class  RenewalList extends Component {

    render(){
        const { t, i18n } = this.props;
        return(
            <div>
                <h2 className="mb-3 mt-2">{t('renewals.title_new')}</h2>
            </div>
        );

    }
}


export default withTranslation()(RenewalList); 