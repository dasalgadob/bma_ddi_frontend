import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from "react-router-dom";
import { withTranslation } from 'react-i18next';

class EditUser extends Component {

    getAvgRating = (answers) => {
        answers.forEach(element => {
            if(element.impact != null){

            }
        });
    }

    render(){
        const {t, i18n} = this.props;
        const {data} = this.props;
        console.log("props ResultsTable:");
        console.log(data);
        return <div className="container">
            
        </div>;
    }
}

export default withTranslation()(EditUser); 