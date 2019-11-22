import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function BusinessUnitTable({data}){
    const { t, i18n } = useTranslation();
    const [results, setResults] = useState(data);

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
            {results.map( item => 
                <tr key={item.attributes.id}>
                    <th scope="row">{item.attributes.id}</th>
                    <td>{item.attributes.code}</td>
                    <td>{item.attributes.name}</td>
                    <td>{item.attributes.updated_at.substring(0,10)}</td>
                    <td>{item.attributes.created_at.substring(0,10)}</td>
                     
                    <td>
                        Editar
                    </td>
                   
                     <td >
                        Borrar
                     </td>
                </tr>)}
        </tbody>
    </table>
</div>);
}

export default withTranslation()(BusinessUnitTable);