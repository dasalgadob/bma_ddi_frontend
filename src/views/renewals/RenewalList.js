import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class  RenewalList extends Component {

    constructor(props){
        super(props);
        this.state = {
            fields: {name: "",
                        description: ""
                    }
        };
    }

    render(){
        const { t, i18n } = this.props;
        const {fields} = this.state;


        return(
            <div>
                <h2 className="mb-3 mt-2">{t('renewals.title_new')}</h2>

                <div className="form-group">
                    <label for="exampleInputName">{t('renewals.name')}</label>
                    <input name='name' type="text" className="form-control" 
                        id="exampleInputName" aria-describedby="emailHelp" 
                        placeholder={t('renewals.name_placeholder')} required
                        onChange={this.onInputChange}
                        value={fields.name}/>
                </div>

                <div className="form-group">
                    <label for="description">{t('renewals.description')}</label>
                    <input name='name' type="text" className="form-control" 
                        id="description" aria-describedby="emailHelp" 
                        placeholder={t('renewals.description_placeholder')} required
                        onChange={this.onInputChange}
                        value={fields.description}/>
                </div>
            </div>
        );

    }
}


export default withTranslation()(RenewalList); 