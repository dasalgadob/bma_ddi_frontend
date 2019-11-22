import React, { useState } from 'react';
import { withTranslation, useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {isCurrentUserAdmin} from './../../helpers/Auth';

function BusinessUnit() {

    const { t, i18n } = useTranslation();
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const isAdmin=false;

    function handleSubmit(e){
        e.preventDefault();
        console.log("Do submit");
    }

    return (
        <div>
            <h2 className="mb-3 mt-2">{t('business_units.title_new')}</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label for="code">{t('business_units.code')}</label>
                    <input name='code' type="text" className="form-control"
                        id="code" aria-describedby="emailHelp"
                        placeholder={t('business_units.code_placeholder')} required
                        onChange={e => setCode(e.target.value)}
                        value={code} />
                </div>
                <div className="form-group">
                    <label for="exampleInputName">{t('business_units.name')}</label>
                    <input name='lastName' type="text" className="form-control" id="exampleInputName"
                        aria-describedby="emailHelp" placeholder={t('business_units.name_placeholder')}
                        onChange={e => setName(e.target.value)}
                        value={name} />
                </div>

                <button type="submit" className="btn btn-primary mt-4" >{t('business_units.save')}</button>
            </form>
        </div>
    );


}


export default withTranslation()(BusinessUnit); 