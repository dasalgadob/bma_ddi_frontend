
import React, { Component } from 'react';
import { map } from 'rsvp';

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
        fetch(`${PATH_BASE}`)
        .then(response => response.json())
        .then(result => this.setUsers(result))
        .catch(error => error);
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