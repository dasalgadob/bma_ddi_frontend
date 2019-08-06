import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from "react-router-dom";
import { withTranslation } from 'react-i18next';

class ResultsTable extends Component {

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
            <table className="table table-bordered table-hover table-sm">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" >id</th>
                        <th scope="col">{t('results.position')}</th>
                        <th scope="col">{t('results.company')}</th>
                        <th scope="col">{t('results.candidate')}</th>
                        <th scope="col">{t('results.email_candidate')}</th>
                        <th scope="col">{t('results.interviewer')}</th>
                       {/**  <th scope="col">Puntuación</th>*/}
                        <th scope="col">{t('results.finished')}</th>
                        <th scope="col">{t('results.edit')}</th>
                        <th scope="col">{t('results.show')}</th>
                        <th scope="col">Fecha creación</th>
                        <th scope="col">Fecha ultima modificación</th>
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
                            <td>{item.created_at.substring(0,10)}</td>
                             <td>{item.updated_at.substring(0,10)}</td>

                        </tr>)}
                </tbody>
            </table>
        </div>;
    }
}

export default withTranslation()(ResultsTable); 