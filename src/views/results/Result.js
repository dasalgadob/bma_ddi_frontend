import React, { Component } from 'react';
import MotivationalAnswer from './../answers/MotivationalAnswer';
const axios = require('axios');

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/results`;

export default class Result extends Component{


  constructor(props){
    super(props);
    this.state = {
      id: props.match.params.id,
      resultData: null,
      answerQuestions: []
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
                resultData: response.data 
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
  }

  showMotivationalAnswer = (aq) => {
    if(aq.dimension == 43){
      return(
      <MotivationalAnswer
          question={aq.question.translation.spanish}
          answer={aq.answer.resume}
          score={aq.answer.rating}>
        </MotivationalAnswer>);
    }else{
      return (<div></div>);
    }
  }

  render(){

    if(!this.state.resultData){
      return <div></div>
    }
    console.log("answer questions:");

    console.log(this.state.answerQuestions);
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
          <h5 className="font-weight-bold">{d.spanish}</h5>
          {included.map( i => 
            <div>
              {i.type == 'answer' && i.attributes.dimension[0].id == d.id?<p style={{fontSize: "15px"}}>{i.attributes.resume}</p>:''}
            </div>
          )}
          <p></p>
          </div>)

           
        }

        {/** Section of dimensions, its questions and the score */}



        <h4>Compatibilidad motivacional</h4>
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


