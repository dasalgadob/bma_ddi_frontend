import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

export default class ResultsTable extends Component {
    render(){
        const {data} = this.props;
        return <div className="container">
            <table className="table table-bordered table-hover table-sm">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" >id</th>
                        <th scope="col">Posición</th>
                        <th scope="col">Compañia</th>
                        <th scope="col">Candidato</th>
                        <th scope="col">Email candidato</th>
                        <th scope="col">Entrevistador</th>
                        <th scope="col">Puntuación</th>
                        <th scope="col">Ver</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map( item => 
                        <tr>
                            <th scope="row">{item.id}</th>
                            <td>{item.position}</td>
                            <td>{item.company}</td>
                            <td>{item.candidate ? item.candidate.name : ''}</td>
                            <td>{item.candidate ?  item.candidate.email: ''}</td>
                            <td>{item.user.name + ' ' + (item.user.last_name? item.user.last_name: '') }</td>
                            <td>0</td>
                            <td><a href="#"><FontAwesomeIcon icon={faEye} /></a></td>
                        </tr>)}
                </tbody>
            </table>
        </div>;
    }
}