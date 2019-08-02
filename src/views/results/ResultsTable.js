import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from "react-router-dom";


export default class ResultsTable extends Component {

    getAvgRating = (answers) => {
        answers.forEach(element => {
            if(element.impact != null){

            }
        });
    }

    render(){
        const {data} = this.props;
        console.log("props ResultsTable:");
        console.log(data);
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
                       {/**  <th scope="col">Puntuación</th>*/}
                        <th scope="col">Terminado</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Ver</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map( item => 
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.position}</td>
                            <td>{item.company}</td>
                            <td>{item.candidate ? item.candidate.name : ''}</td>
                            <td>{item.candidate ?  item.candidate.email: ''}</td>
                            <td>{item.user.name + ' ' + (item.user.last_name? item.user.last_name: '') }</td>
                            {/** <td>{0}</td>*/ }
                            <td>{item.is_not_finished?"no":"si"}</td>
                            <td>{item.is_not_finished?<Link to={{pathname: "/interviews/"+item.interview_id+ '/fill', state: {idResult: item.id}}}>
                                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                </Link>:""}
                            </td>
                            <td><Link to={"/results/"+item.id}><FontAwesomeIcon icon={faEye} /></Link></td>
                        </tr>)}
                </tbody>
            </table>
        </div>;
    }
}