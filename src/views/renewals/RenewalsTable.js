import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
class RenewalsTable extends Component {

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
                        <th scope="col">{t('renewals.name')}</th>
                        <th scope="col">{t('renewals.description')}</th>
                        <th scope="col">{t('renewals.user')}</th>
                        <th scope="col">{t('renewals.edit')}</th>
                        <th scope="col">{t('renewals.show')}</th>
                        <th scope="col">{t('renewals.created_at')}</th>
                        <th scope="col">{t('renewals.updated_at')}</th>
                        <th scope="col">{t('renewals.delete')}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map( item => 
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.user.email }</td>
                            <td>Editar</td>
                            <td>Mostrar</td>
                            <td>{item.created_at.substring(0,10)}</td>
                            <td>{item.updated_at.substring(0,10)}</td>
                             <td >
                                 Eliminar
                             </td>
                        </tr>)}
                </tbody>
            </table>
        </div>;
    }
}

export default withTranslation()(RenewalsTable); 