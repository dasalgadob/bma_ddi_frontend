import React, {Component} from 'react';
import DimensionHeader from './DimensionHeader';
import Rating from '@prontopro/react-rating';
import TextareaAutosize from 'react-autosize-textarea';
import { statement } from '@babel/template';
const axios = require('axios');

export default class AnswersDimensions extends Component{

    constructor(props){
        super(props);

    }


    questionsForCurrentDimension = () => {
        const questions = this.props.questions.filter((q) => {
            //if(q['dimension_id']=)
            //console.log("Answer dimension q: ");
            //console.log(q);
            //console.log("current dimension:" + this.props.dimensionId);
            if(q.attributes.dimension_id == this.props.dimensionId){
                return true;
            }
        });
        //console.log('questionsForCurrentDimension');
        //console.log(questions);
        return questions;
    }

    render(){
        //console.log("Questions: ");
        //console.log( this.questionsForCurrentDimension());
        if(!this.props.questions || !this.props.dimensionId){
            return <div></div>;
        }
        console.log("Dimension id:" + this.props.dimensionId);
        return (
            <div className="mt-8">
                <DimensionHeader dimensionId={this.props.dimensionId}></DimensionHeader>
                <div className="mt-4">
                {
                    this.questionsForCurrentDimension().map(q => 
                        <div key={q.id}>
                            <p className="font-weight-bold">{q.attributes.translation.spanish}</p>
                            <div className="row">
                            <div className="form-group col-sm-4">
                                <label htmlFor="exampleFormControlTextarea1">Situación/Tarea</label>
                                <TextareaAutosize className="form-control"
                                            name={"situation"} 
                                            id={q.id}
                                            onChange={this.props.onInputChangeAnswerDimension}
                                            onBlur={() => {this.props.onBlurAutoSave(q.id, 'd') }}
                                            rows={3}
                                            value={this.props.answers.get(""+q.id+"")['situation']}
                                            ></TextareaAutosize>
                            </div> 
                            <div className="form-group col-sm-4">
                                <label htmlFor="exampleFormControlTextarea1">Acción</label>
                                <TextareaAutosize className="form-control" 
                                             name={"action"} 
                                             id={q.id}
                                             onChange={this.props.onInputChangeAnswerDimension}
                                             onBlur={() => {this.props.onBlurAutoSave(q.id, 'd') }}
                                             value={this.props.answers.get(""+q.id+"")['action']}
                                            rows={3}></TextareaAutosize>
                               
                            </div> 
                            <div className="form-group col-sm-4">
                                <label htmlFor="exampleFormControlTextarea1">Resultado</label>
                                <TextareaAutosize className="form-control" 
                                             name={"resultado"} 
                                             id={q.id}
                                             onChange={this.props.onInputChangeAnswerDimension} 
                                             onBlur={() => {this.props.onBlurAutoSave(q.id, 'd') }}
                                             value={this.props.answers.get(""+q.id+"")['resultado']}
                                            rows={3}></TextareaAutosize>
                              
                            </div> 
                            </div>
                            <div className="form-group col-sm-12">
                                <label htmlFor="exampleFormControlTextarea1">Resumen</label>
                                <TextareaAutosize className="form-control" 
                                                  name={"resume"} 
                                                  id={q.id}
                                                  onChange={this.props.onInputChangeAnswerDimension}
                                                  onBlur={() => {this.props.onBlurAutoSave(q.id, 'd') }}
                                                  value={this.props.answers.get(""+q.id+"")['resume']}  
                                                  rows={3}></TextareaAutosize>
                                
                            </div>   
                            <div className="row">
                            <div className="form-group col-sm-4">
                                Puntuación 
                                <Rating
                                onClick={(n, e) => this.props.onInputChangeAnswerRating("rating", q.id, n, e)}
                                onBlur={() => {this.props.onBlurAutoSave(q.id, 'd') }}
                                animateOnHover
                                disableAnimation
                                initialRate={this.props.answers.get(""+q.id+"")['rating']}
                                stop={5}
                                /></div>

                            <div className="form-group col-sm-4">
                                Impacto
                                <Rating
                                onClick={(n, e) => this.props.onInputChangeAnswerRating("impact", q.id, n, e)}
                                onBlur={() => {this.props.onBlurAutoSave(q.id, 'd') }}
                                animateOnHover
                                disableAnimation
                                initialRate={this.props.answers.get(""+q.id+"")['impact']}
                                stop={5}
                                /></div>


                            <div className="form-group col-sm-4">
                                Comunicación
                                <Rating
                                onClick={(n, e) => this.props.onInputChangeAnswerRating("communication", q.id, n, e)}
                                onBlur={() => {this.props.onBlurAutoSave(q.id, 'd') }}
                                animateOnHover
                                disableAnimation
                                initialRate={this.props.answers.get(""+q.id+"")['communication']}
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