import React, {Component} from 'react';
import Candidate from './Candidate';
import Candidates from './Candidates';

/**
 * This class incldues the nav for creating or selecting a candidate
 * The second part display the proper content for each option of the menu
 * 
 */
export default class MenuCandidate extends Component {

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
        return (
        <div className="container" style={this.props.style}>
            <h3>Candidato</h3>
            <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className={`nav-link ${this.state.isCreateCandidateTab? "active": ''}` }
                onClick={this.onChangeTab} 
                href="#">Crear candidato</a>
            </li>
            <li className="nav-item">
                <a className={`nav-link ${!this.state.isCreateCandidateTab? "active": ''}` }
                onClick={this.onChangeTab}  
                href="#">Usar candidato ya existente</a>
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