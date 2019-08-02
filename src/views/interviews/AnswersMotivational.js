import React, {Component} from 'react';
import DimensionHeader from './DimensionHeader';
import Rating from '@prontopro/react-rating';
import TextareaAutosize from 'react-autosize-textarea';
import AnswerMotivational from './AnswerMotivational';
import { statement } from '@babel/template';
const axios = require('axios');

export default class AnswersDimensions extends Component{

    constructor(props){
        super(props);

    }


    questionsForCurrentDimension = () => {
        const questions = this.props.questions.filter((q) => {
            //if(q['dimension_id']=)
            
            //console.log("current dimension:" + this.props.dimensionId);
            if(q.attributes.dimension_id == 43){
                console.log("Answer dimension q: ");
            console.log(q);
                return true;
            }
        });
        //console.log('questionsForCurrentDimension');
        //console.log(questions);
        return questions;
    }

    render(){
        
        if(!this.props.questions || !this.props.dimensionId){
            return <div></div>;
        }
        //console.log("Questions: ");
        //console.log( this.questionsForCurrentDimension());
        console.log("Dimension id:" + this.props.dimensionId);
        return (



            <div className="mt-8">
                <h3>Preguntas sobre Facetas Motivacionales</h3>
                <div className="mt-4">
                {
                    this.questionsForCurrentDimension().map(q => 
                        <div key={q.id}>
                            <h4>{q.attributes.name? q.attributes.name.spanish:""}</h4>
                            <p className="mb-4 text-secondary">{q.attributes.description?q.attributes.description.spanish:""}</p>
                            <p className="mt-2">{q.attributes.translation.spanish}</p>
                            <div className="row">
                            <div className="form-group col-sm-12">
                                <label htmlFor="exampleFormControlTextarea1">Respuesta</label>
                                <TextareaAutosize className="form-control" 
                                                  name={"resume"} 
                                                  id={q.id}
                                                  onChange={this.props.onInputChangeAnswerDimension}
                                                  onBlur={() => {this.props.onBlurAutoSave(q.id) }}
                                                  value={this.props.answers.get(""+q.id+"")['resume']}   
                                                  rows={3}></TextareaAutosize>
                                
                            </div>   
                            
                            <div className="form-group col-sm-4">
                                Puntuación 
                                <Rating
                                onClick={(n, e) => this.props.onInputChangeAnswerRating("rating", q.id, n, e)}
                                onBlur={() => {this.props.onBlurAutoSave(q.id) }}
                                animateOnHover
                                disableAnimation
                                initialRate={this.props.answers.get(""+q.id+"")['rating']}
                                stop={5}
                                /></div>


                            
                            </div> 
                        </div>
                        
                ) }      
                </div>    
            </div>
            );
    }
}