import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function BusinessUnitTable(){
    const { t, i18n } = useTranslation();
    const data = [];

    return (<div className="container">
    <table className="table table-bordered table-hover table-sm">
        <thead className="thead-dark">
            <tr>
                <th scope="col" >id</th>
                <th scope="col">{t('business_units.code')}</th>
                <th scope="col">{t('business_units.name')}</th>
                <th scope="col">{t('business_units.updated_at')}</th>
                <th scope="col">{t('business_units.created_at')}</th>
                <th scope="col">{t('business_units.edit')}</th>
                <th scope="col">{t('business_units.delete')}</th>
            </tr>
        </thead>
        <tbody>
            {data.map( item => 
                <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.updated_at.substring(0,10)}</td>
                    <td>{item.created_at.substring(0,10)}</td>
                     
                    <td>{item.is_not_finished?<Link to={{pathname: "/interviews/"+item.interview_id+ '/fill', state: {idResult: item.id}}}>
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </Link>:""}
                    </td>
                   
                     {this.props.currentUserAdmin? <td >
                        <a   role="button" href="#"  id={item.id} className="col-sm-1 btn btn-link"  
                                onClick={() => this.props.onDelete(item.id, item.position? item.position: "")} className="">
                            <FontAwesomeIcon icon={faTrash}/>
                        </a>
                     </td>:""}
                </tr>)}
        </tbody>
    </table>
</div>);
}

export default withTranslation()(BusinessUnitTable);