import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class  RenewalsList extends Component {

    render(){
        const { t, i18n } = this.props;
        return(
            <div>
                <h2 className="mb-3 mt-2">{t('interviews.title_lower')}</h2>
                <div className="container">
                    <div className="row align-items-left">
                    <Link to='renewalsList/new' className=" btn btn-primary">
                        <FontAwesomeIcon icon={faPlus} /> {t('renewals.create')}
                    </Link>
                    </div>
                    
                </div>
            </div>
        );

    }
}


export default withTranslation()(RenewalsList); 