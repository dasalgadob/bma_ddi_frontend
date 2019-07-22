import React, {Component} from 'react';
import Candidate from '../candidates/Candidate';
import Candidates from '../candidates/Candidates';
import Rating from '@prontopro/react-rating';
const axios = require('axios');

export default class NavDimensions extends Component{


    render(){
        if(!this.props.dimensions){
            return <div></div>;
        }
        return <div>
            <ul className="nav nav-tabs">

                {this.props.dimensions.map((item) => 
                    
                <li className="nav-item" key={item.id}>
                    <a id={item.id} className={`nav-link ${true? "active": ''}` }
                        onClick={this.props.onClick} 
                        href="#">{item.spanish}</a>
                </li>
                
                )}  
            </ul>            

        </div>
    }
}