import React, {Component} from 'react';
import Candidate from './Candidate';
import Candidates from './Candidates';
import { withTranslation } from 'react-i18next';

/**
 * This class incldues the nav for creating or selecting a candidate
 * The second part display the proper content for each option of the menu
 * 
 */
class MenuCandidate extends Component {

    constructor(props){
        super(props);
        this.state = {
            isCreateCandidateTab: true
        };
    }

    onChangeTab = (e) => {
        if(!e.target.className.includes('active')){
            this.setState({
                isCreateCandidateTab: !this.state.isCreateCandidateTab
            });
        }
    }

    render(){
        const {isCreateCandidateTab} = this.state;
        const {t, i18n} = this.props;
        const alertStyle = {position: "fixed",
            top: "100px", 
            left:"2%",
            width: "30%",
            zIndex: 100};
        return (
        <div className="container" style={this.props.style}>
            {this.props.errorAlert?
            
                    <div className="myAlert-top alert alert-danger" style={alertStyle}>
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    El candidato ya existe.
                    </div>:<div></div>
            }
            <h3>{t('fill.candidate_form.candidate')}</h3>
            <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className={`nav-link ${this.state.isCreateCandidateTab? "active": ''}` }
                onClick={this.onChangeTab} 
                href="#">{t('fill.candidate_form.create')}</a>
            </li>
            <li className="nav-item">
                <a className={`nav-link ${!this.state.isCreateCandidateTab? "active": ''}` }
                onClick={this.onChangeTab}  
                href="#">{t('fill.candidate_form.use_existing')}</a>
            </li>
            
            </ul>

            <div style={isCreateCandidateTab? {display: 'block'}: {display: 'none'}}>
                <Candidate onInputChange={this.props.onInputChange} onSubmit={this.props.onSaveCandidate}></Candidate>
            </div>

            <div style={!isCreateCandidateTab? {display: 'block'}: {display: 'none'}}>

                <Candidates onChooseCandidate={this.props.onChooseCandidate}></Candidates>
            </div>
        </div>
        );
    }
}

export default withTranslation()( MenuCandidate);