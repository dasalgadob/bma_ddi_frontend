import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

class Candidate extends Component{

    constructor(props){
        super(props);
    }

    handleSubmit = (e) => {
        this.props.onSubmit(e);
    }

    render(){
        const {t, i18n} = this.props;
        return(<div className="">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
                    <label htmlFor="exampleInputPassword1" className="align-left">{t('fill.candidate_form.name')}</label>
                    <input type="text"
                           name="name"
                           className="form-control" 
                           id="exampleInputPassword1" 
                           placeholder={t('fill.candidate_form.name_required')}
                           required="required"
                           onChange={this.props.onInputChange}/>
                </div>
                <div className="form-group row">
                    <label htmlFor="exampleInputEmail1" className="align-left">{t('fill.candidate_form.email')}</label>
                    <input type="email" 
                           name="email"
                           className="form-control" 
                           id="exampleInputEmail1" 
                           aria-describedby="emailHelp" 
                           placeholder={t('fill.candidate_form.email_required')}
                           required="required"
                           onChange={this.props.onInputChange} />
                </div>
                
                <button type="submit" className="btn btn-primary">{t('fill.candidate_form.save')}</button>
            </form>
        </div>);
    }
}

export default withTranslation()(Candidate);