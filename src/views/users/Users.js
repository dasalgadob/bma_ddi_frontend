
import React, { Component } from 'react';
import { map } from 'rsvp';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


const axios = require('axios');

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/users`;
const USERS_URL = `${process.env.REACT_APP_BACKEND_URL}/users`;

class Users extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: null,
            currentUserAdmin: false
            };

        this.setUsers = this.setUsers.bind(this);    
    }

    setUsers(result){
        this.setState({result});
    }

    componentDidMount(){
        console.log("componentDidMount");
        console.log("Do notgnb");
        const headers = JSON.parse(localStorage.getItem('user'));
        let self = this;
        axios({
            method: 'get',
            url: `${PATH_BASE}`,
            headers: headers
            })
        .then(function (response) {
            // handle success
            console.log("then");
            console.log(response.data);
            self.setState({ result: response.data}, self.loadCurrentUserFromServer);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }


    loadCurrentUserFromServer = () => {
        
        
        const headers = JSON.parse(localStorage.getItem('user'));
        //console.log("idInt:" + idInterview);
        let method = 'get';
        let self = this;
        
        axios({
            method: method,
            url: `${USERS_URL}/${headers.id}`,
            headers: headers
            })
        .then(function (response) {
            // handle success
            console.log("loadCurrentUserFromServer");
            console.log(response.data);

            self.setState({currentUserAdmin: response.data.admin});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    } 

    renderCreateUser = () => {
    const {t, i18n} = this.props;
        if(this.state.currentUserAdmin){
            return(
                <div className="row ml-4">
                <Link to='users/new' className=" btn btn-primary">
                    <FontAwesomeIcon icon={faPlus} /> {t('users.create')}
                </Link>
                </div>
            );
        }
    }


    render(){
        const { result } = this.state;
        if(!result){ return null;}
        const {t, i18n} = this.props;

        return (
        <div>
            {this.renderCreateUser()}
                        
            <h1>{t('users.title')}</h1>


            <table className="table table-hover">
            <thead>
                <tr>
                <th>{t('users.name')}</th>
                <th colspan>{t('users.last_name')}</th>
                <th colspan>{t('users.email')}</th>
                <th colspan>{t('users.edit')}</th>
                <th colspan>{t('users.administrator')}</th>
                </tr>
            </thead>

            <tbody>
            
                {result.map(
                    user => 
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>
                        <Link to={{pathname: "/users/"+user.id+ '/edit'}}>
                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </Link>
                        </td>
                        <td>{user.admin?"v":"f"}</td>
                    </tr>
                )}
               
            </tbody>
            </table>
        </div>);
    }
}

export default withTranslation()(Users);