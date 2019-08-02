import React, {Component} from 'react';
import Candidate from '../candidates/Candidate';
import Candidates from '../candidates/Candidates';
import Rating from '@prontopro/react-rating';
import { withTranslation } from 'react-i18next';
const axios = require('axios');

class NavDimensions extends Component{


    render(){

        if(!this.props.dimensions){
            return <div></div>;
        }
        const {t, i18n} = this.props;
        const language = i18n.language == "es"? "spanish":"english";
        return <div>
            <ul className="nav nav-tabs mt-2">

                {this.props.dimensions.map((item) => 
                    
                <li className={"nav-item "} key={item.id}>
                    <a id={item.id} className={`nav-link ${this.props.currentDimension==item.id?"active":""}` }
                        onClick={this.props.onClick} 
                        href="#">{item[language]}</a>
                </li>
                
                )}  
            </ul>            

        </div>
    }
}

export default withTranslation()( NavDimensions);