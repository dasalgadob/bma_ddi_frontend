import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {Redirect} from 'react-router-dom'; 

import axios from 'axios';

const RENEWAL_LIST_URL = `${process.env.REACT_APP_BACKEND_URL}/contract_renewal_lists`;

class  RenewalList extends Component {

    constructor(props){
        super(props);
        this.state = {
            fields: {name: "",
                    description: ""
                    },
            redirect: false,
            errorAlert: true    
        };
    }

    onInputChange = (e) => {
        const {fields} = this.state;
        fields[e.target.name] = e.target.value;
        this.setState(fields);

    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.createRenewalList();
    }

    createRenewalList = () =>{

        const {fields} = this.state;
        
        const headers = JSON.parse(localStorage.getItem('user'));
        //console.log("idInt:" + idInterview);
        let method = 'post';
        let self = this;
        
        axios({
            method: method,
            url: `${RENEWAL_LIST_URL}`,
            data: 
            {contract_renewal_list:
                { name: fields.name,
                description: fields.description,
                user: headers.uid
                }
            },
            headers: headers
            })
        .then(function (response) {
            // handle success
            //console.log(response.data);
            self.setRedirect();
        })
        .catch(function (error) {
            // handle error
            self.setState({errorAlert: true});
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    } //End createUser

    /**
     * When the POST request is done the redirect is set to True to not keep showing the same page.
     */
    setRedirect = () => {
        this.setState({
          redirect: true
        });
    }

    /**Url where the page is going to be redirected when the POST request finsihed succesfully */
    renderRedirect = () => {
        if (this.state.redirect ) {
            return <Redirect to={'/renewalsList/'} />
        }
    } 

    render(){
        const { t, i18n } = this.props;
        const {fields} = this.state;


        return(
            <div>
            {/**First check if the POST request was made so redirect to the index page of renewalsList */}    
            {this.renderRedirect()}

            {/**Otherwise */}
            <form onSubmit={this.handleSubmit}>
                <h2 className="mb-3 mt-2">{t('renewals.title_new')}</h2>

                <div className="form-group">
                    <label for="exampleInputName">{t('renewals.name')}</label>
                    <input name='name' type="text" className="form-control" 
                        id="exampleInputName" aria-describedby="emailHelp" 
                        placeholder={t('renewals.name_placeholder')} required
                        onChange={this.onInputChange}
                        value={fields.name}/>
                </div>

                <div className="form-group">
                    <label for="description">{t('renewals.description')}</label>
                    <input name='description' type="text" className="form-control" 
                        id="description" aria-describedby="emailHelp" 
                        placeholder={t('renewals.description_placeholder')} required
                        onChange={this.onInputChange}
                        value={fields.description}/>
                </div>
                <button type="submit" className="btn btn-primary mt-4" >{t('user.save')}</button>
            </form>
            </div>
        );

    }
}


export default withTranslation()(RenewalList); 