import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class  BusinessUnits extends Component {

    render(){
        const { t, i18n } = this.props;
        return(
            <div>
                <h2 className="mb-3 mt-2">{t('business_units.title')}</h2>
                <div className="container">
                    <div className="row align-items-left">
                    <Link to='businessUnits/new' className=" btn btn-primary">
                        <FontAwesomeIcon icon={faPlus} /> {t('business_units.create')}
                    </Link>
                    </div>
                    
                </div>
            </div>
        );

    }
}


export default withTranslation()(BusinessUnits); 