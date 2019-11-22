import BusinessUnitTable from './BusinessUnitTable';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const axios = require('axios');

const BUSINESS_UNITS_BASE = `${process.env.REACT_APP_BACKEND_URL}/business_units`;

class  BusinessUnits extends Component {

    constructor(props){
        super(props);
        this.state = {
            results: null
        };

    }

    componentDidMount(){
        console.log("componentDidMount BusinessUnit");
        const headers = JSON.parse(localStorage.getItem('user'));
        let self = this;
        axios({
            method: 'get',
            url: `${BUSINESS_UNITS_BASE}`,
            headers: headers
            })
        .then(function (response) {
            // handle success
            console.log("then");
            console.log(response.data);
            self.setState({ results: response.data}, self.loadCurrentUserFromServer);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    loadCurrentUserFromServer(){

    }

    render(){
        const { t, i18n } = this.props;
        console.log("Results BusinessUnits");
        console.log(this.state.results);
        if(!this.state.results){
            return null;
        } 
        return(
            <div>
                <h2 className="mb-3 mt-2">{t('business_units.title')}</h2>
                <div className="container">
                    <BusinessUnitTable data={this.state.results.data}></BusinessUnitTable>
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