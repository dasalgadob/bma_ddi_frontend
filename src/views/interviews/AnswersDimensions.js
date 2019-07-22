import React, {Component} from 'react';
import DimensionHeader from './DimensionHeader';
import Rating from '@prontopro/react-rating';
import TextareaAutosize from 'react-autosize-textarea';
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
                                            id="exampleFormControlTextarea1" 
                                            rows="3"></TextareaAutosize>
                                <h1>
                                <Rating
                                animateOnHover
                                disableAnimation
                                initialRate={0}
                                stop={5}
                                /></h1>
                            </div> 
                            <div className="form-group col-sm-4">
                                <label htmlFor="exampleFormControlTextarea1">Acción</label>
                                <TextareaAutosize className="form-control" 
                                            id="exampleFormControlTextarea1" 
                                            rows="3"></TextareaAutosize>
                                <h1>
                                <Rating
                                animateOnHover
                                disableAnimation
                                initialRate={0}
                                stop={5}
                                /></h1>
                            </div> 
                            <div className="form-group col-sm-4">
                                <label htmlFor="exampleFormControlTextarea1">Resultado</label>
                                <TextareaAutosize className="form-control" 
                                            id="exampleFormControlTextarea1" 
                                            rows="3"></TextareaAutosize>
                                <h1>
                                <Rating
                                animateOnHover
                                disableAnimation
                                initialRate={0}
                                stop={5}
                                /></h1>
                            </div> 
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Resumen</label>
                                <TextareaAutosize className="form-control" id="exampleFormControlTextarea1" rows="3"></TextareaAutosize>
                                <h1>
                                <Rating
                                animateOnHover
                                disableAnimation
                                initialRate={0}
                                stop={5}
                                /></h1>
                            </div>    
                        </div>
                        
                ) }      
                </div>    
            </div>
            );
    }
}