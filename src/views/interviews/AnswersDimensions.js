import React, {Component} from 'react';
import DimensionHeader from './DimensionHeader';
import Rating from '@prontopro/react-rating';
import TextareaAutosize from 'react-autosize-textarea';
import { withTranslation } from 'react-i18next';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const axios = require('axios');


class AnswersDimensions extends Component{

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

        const {t, i18n} = this.props;
        const language = i18n.language == "es"? "spanish":"english";
        //console.log("Dimension id:" + this.props.dimensionId);
        return (
            <div className="mt-8">
                <DimensionHeader dimensionId={this.props.dimensionId}></DimensionHeader>
                <div className="mt-4">
                {
                    this.questionsForCurrentDimension().map(q => 
                        <div key={q.id}>
                            <div className="row">
                                <p className="font-weight-bold col-sm-11">{q.attributes.translation[language]}</p>
                                <a   role="button" href="#"  id={this.props.id} className="col-sm-1 btn btn-link"  
                                        onClick={() => this.props.onDelete(q.id)} className="">
                                    <FontAwesomeIcon icon={faTrash}/>
                                </a>
                            </div>
                            <div className="row">
                            <div className="form-group col-sm-4">
                                <label htmlFor="exampleFormControlTextarea1">
                                {t('fill.step1.task')}
                                </label>
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
                                <label htmlFor="exampleFormControlTextarea1">
                                {t('fill.step1.action')}
                                </label>
                                <TextareaAutosize className="form-control" 
                                             name={"action"} 
                                             id={q.id}
                                             onChange={this.props.onInputChangeAnswerDimension}
                                             onBlur={() => {this.props.onBlurAutoSave(q.id, 'd') }}
                                             value={this.props.answers.get(""+q.id+"")['action']}
                                            rows={3}></TextareaAutosize>
                               
                            </div> 
                            <div className="form-group col-sm-4">
                                <label htmlFor="exampleFormControlTextarea1">
                                {t('fill.step1.result')}
                                </label>
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
                                <label htmlFor="exampleFormControlTextarea1">
                                {t('fill.step1.resume')}
                                </label>
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
                            {t('fill.step1.score')} 
                                <Rating
                                onClick={(n, e) => this.props.onInputChangeAnswerRating("rating", q.id, n, e)}
                                onBlur={() => {this.props.onBlurAutoSave(q.id, 'd') }}
                                animateOnHover
                                disableAnimation
                                initialRate={this.props.answers.get(""+q.id+"")['rating']}
                                stop={5}
                                /></div>

                            <div className="form-group col-sm-4">
                            {t('fill.step1.impact')}
                                <Rating
                                onClick={(n, e) => this.props.onInputChangeAnswerRating("impact", q.id, n, e)}
                                onBlur={() => {this.props.onBlurAutoSave(q.id, 'd') }}
                                animateOnHover
                                disableAnimation
                                initialRate={this.props.answers.get(""+q.id+"")['impact']}
                                stop={5}
                                /></div>


                            <div className="form-group col-sm-4">
                            {t('fill.step1.comunication')}
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

export default withTranslation()(AnswersDimensions);