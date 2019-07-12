import React, {Component} from 'react';
import Candidate from '../candidates/Candidate';
import Candidates from '../candidates/Candidates';

export default class FillInterview extends Component{

    constructor(props){
        super(props);

        this.state= {
            isCreateCandidateTab: true,
            styleCreateCandidate: {display: 'block'},
            styleUseCandidate: {display: 'none'}
        };

        this.onChangeIsCreateCandidateTab = this.onChangeIsCreateCandidateTab.bind(this);
        this.onChangeIsUseCandidateTab = this.onChangeIsUseCandidateTab.bind(this);
    }


    onChangeIsCreateCandidateTab(){
        this.setState({
            isCreateCandidateTab: true,
            styleCreateCandidate: {display: 'block'},
            styleUseCandidate: {display: 'none'}
        });
    }

    onChangeIsUseCandidateTab(){
        this.setState({
            isCreateCandidateTab: false,
            styleCreateCandidate: {display: 'none'},
            styleUseCandidate: {display: 'block'}
        });
    }

    render(){
        const {styleCreateCandidate, styleUseCandidate} = this.state;

        return(<div class="container">
            <h3>Candidato</h3>
            <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className={`nav-link ${this.state.isCreateCandidateTab? "active": ''}` }
                   onClick={this.onChangeIsCreateCandidateTab} 
                   href="#">Crear candidato</a>
            </li>
            <li className="nav-item">
                <a className={`nav-link ${!this.state.isCreateCandidateTab? "active": ''}` }
                   onClick={this.onChangeIsUseCandidateTab}  
                   href="#">Usar candidato ya existente</a>
            </li>
            
            </ul>

            <div style={styleCreateCandidate}>
                <Candidate></Candidate>
            </div>

            <div style={styleUseCandidate}>

                <Candidates></Candidates>
            </div>
        </div>);
    }
}
