import React, { Component } from 'react';
import MotivationalAnswer from './../answers/MotivationalAnswer';
import DimensionalAnswer from './../answers/DimensionalAnswer';

const axios = require('axios');

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/results`;

export default class Result extends Component{


  constructor(props){
    super(props);
    this.state = {
      id: props.match.params.id,
      resultData: null,
      answerQuestions: [],
      dimensions: []
    };
  }


  componentDidMount(){
    this.loadResultFromServer();
  }

  loadResultFromServer = () => {
    let self = this;
        axios.get(`${PATH_BASE}/${this.state.id}`)
        .then(function (response) {
            // handle success
            console.log('loadResultFromServer');
            console.log(response.data);
            self.setState({
                resultData: response.data,
                dimensions:  response.data.data.attributes.dimensions
            }, self.setAnswerQuestion(response.data.included));
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });   
  } 

  /**Change the value for answer questions to be an object that includes:
   *  id: question id
   *  question: translation and other information about the question
   *  answer: hash of data related to the answers and scores given
   *  dimension: id of dimension that the question belongs to
   */
  setAnswerQuestion = (included) => {
    const {answerQuestions} = this.state;
    console.log("setAnswerQuestion");
    included.forEach(e => {
      if(e.type == 'answer'){
        console.log("answer");
        answerQuestions.push(
          {id: e.attributes.question.id,
             answer: e.attributes,
              dimension: e.attributes.dimension[0].id});
      }else{
        console.log("question");
        /**Find the answerQuestion that has the same id then add the key question and the respective value */
        for(let i=0; i<answerQuestions.length; i++){
          if(e.id == answerQuestions[i].id){
            answerQuestions[i]['question'] = e.attributes;
          }
        }
      }
    });
    this.setState({
      answerQuestions
    });
  }

  showMotivationalAnswer = (aq) => {
    if(aq.dimension == 43){
      return(
      <MotivationalAnswer
          title={aq.question.name?aq.question.name.spanish:""}
          question={aq.question.translation.spanish}
          answer={aq.answer.resume}
          score={aq.answer.rating}
          mandatory={aq.question.mandatory}>
        </MotivationalAnswer>);
    }else{
      return (<div></div>);
    }
  }

  showDimensionalAnswer = (aq, d) => {
    if(aq.dimension != 43 && aq.dimension == d){
      return(
      <DimensionalAnswer
          question={aq.question.translation.spanish}
          situation={aq.answer.situation}
          action ={aq.answer.action}
          result={""}
          rating={aq.answer.rating}
          impact={aq.answer.impact}
          communication={aq.answer.communication}>
        </DimensionalAnswer>);
    }else{
      return (<div></div>);
    }
  }

  averageRatingDimension = idDim =>{
    const {answerQuestions} = this.state;
    let n=0;
    let total =0;
    answerQuestions.forEach(aq => {
      if(aq.dimension == idDim){
        n+=1;
        total+= aq.answer.rating;
      }
      
    });
    return total/n;
  }

  render(){

    if(!this.state.resultData){
      return <div></div>
    }
    console.log("answer questions:");

    console.log(this.state.answerQuestions);
    console.log("dimensions:");
    console.log(this.state.dimensions);

    const data = this.state.resultData.data;
    const included = this.state.resultData.included;
    const {answerQuestions} = this.state;
    return (
      <div>
        <h3>ID: {this.props.match.params.id}</h3>
        <table className="table col-sm-6 table-bordered">
          <tbody>
          <tr>
            <td>CANDIDATO</td>
            <td>{data.attributes.candidate.name}</td>
          </tr>
          <tr>
          <td>PUESTO</td>
            <td>{data.attributes.position}</td>
          </tr>
          <tr>
          <td>ENTREVISTADOR</td>
            <td>{data.attributes.user.name}</td>
          </tr>

          <tr>
          <td>COMPAÑIA</td>
            <td>{data.attributes.company}</td>
          </tr>
          </tbody>
        </table>
        {/** Section of dimensions and the resumes that belongs to it */}
        {data.attributes.dimensions.map(d => 
          <div className="container-fluid">
            <div className="row">
          <h4 className="font-weight-bold mt-4">{d.spanish}</h4>
          {included.map( i => 
            <div key={"resume-" + i.id}>
              {i.type == 'answer' && i.attributes.dimension[0].id == d.id?<p style={{fontSize: "15px"}}>{i.attributes.resume}</p>:''}
            </div>
          )}
          </div>
          </div>)

           
        }

        {/** Section of dimensions, its questions and the score */}

        {data.attributes.dimensions.map(d => 
          <div className="container-fluid mt-4">
          <h5 className="text-secondary " style={{display:  'inline'}}>
          {d.spanish}
          </h5>
          <p  className="text-secondary ">Puntuación: &nbsp;{this.averageRatingDimension(d.id)}</p>
          {answerQuestions.map( aq => 
            <div>
              {this.showDimensionalAnswer(aq, d.id)}
            </div>
          )}
          </div>)
        }

        


        <h4 className="mt-4">Compatibilidad motivacional</h4>
        {/** Iterate through all the answerQuestions then choose only those that belongs to the 43 dimension */}
        {answerQuestions.map(aq => 
          <div>{this.showMotivationalAnswer(aq)}</div>
        )}

        <h4 className="mt-4">Compensacion actual y movilidad</h4>
      <div className="mt-2">
        <p><span  className="font-weight-bold">Salario base: &nbsp;</span>{data.attributes.base_salary}</p>
        <p><span className="font-weight-bold">Beneficios: &nbsp;</span>{data.attributes.benefits}</p>

        <p><span className="font-weight-bold">Expectativas de salarios: &nbsp;</span>{data.attributes.salary_expectations}</p>
        <p><span className="font-weight-bold">Areas geograficas: &nbsp;</span>{data.attributes.geographical_areas}</p>
      </div>

      </div>
    );
  }


  }


