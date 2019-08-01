import React, {Component} from 'react';
import DimensionHeader from './DimensionHeader';
import Rating from '@prontopro/react-rating';
import TextareaAutosize from 'react-autosize-textarea';
import AnswerMotivational from './AnswerMotivational';
import { statement } from '@babel/template';
const axios = require('axios');

export default class MotivationalAnswerInterview extends Component{

    constructor(props){
        super(props);

    }

    render(){
        
        if(!this.props.questions || !this.props.dimensionId){
            return <div></div>;
        }
        return (     
            <div key={q.id}>
                <h4>{q.attributes.name.spanish}</h4>
                <p className="mb-4 text-secondary">{q.attributes.description.spanish}</p>
                <p className="mt-2">{q.attributes.translation.spanish}</p>
                <div className="row">
                <div className="form-group col-sm-12">
                    <label htmlFor="exampleFormControlTextarea1">Respuesta</label>
                    <TextareaAutosize className="form-control" 
                                        name={"resume"} 
                                        id={q.id}
                                        onChange={this.props.onInputChangeAnswerDimension}
                                        onBlur={() => {this.props.onBlurAutoSave(q.id) }}  
                                        rows={3}></TextareaAutosize>
                    
                </div>   
                
                <div className="form-group col-sm-4">
                    Puntuación 
                    <Rating
                    onClick={(n, e) => this.props.onInputChangeAnswerRating("rating", q.id, n, e)}
                    onBlur={() => {this.props.onBlurAutoSave(q.id) }}
                    animateOnHover
                    disableAnimation
                    initialRate={0}
                    stop={5}
                    /></div>
                </div> 
            </div>
        );
                        
                
    }
}