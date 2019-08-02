
import React, { Component } from 'react';
import { map } from 'rsvp';
import { withTranslation } from 'react-i18next';

const axios = require('axios');

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/users`;

export default class Users extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: null,
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
            self.setState({ result: response.data});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    render(){
        const { result } = this.state;
        if(!result){ return null;}

        return (
        <div>
            <h1>Usuarios</h1>


            <table class="table table-hover">
            <thead>
                <tr>
                <th>Nombre</th>
                <th colspan>Apellido</th>
                <th colspan>Email</th>
                <th colspan>Administrador</th>
                </tr>
            </thead>

            <tbody>
            
                {result.map(
                    user => 
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.admin}</td>
                    </tr>
                )}
               
            </tbody>
            </table>
        </div>);
    }
}