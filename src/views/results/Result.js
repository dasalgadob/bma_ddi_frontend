import React, { Component } from 'react';
import MotivationalAnswer from './../answers/MotivationalAnswer';
import DimensionalAnswer from './../answers/DimensionalAnswer';
import { Helmet } from 'react-helmet';


const axios = require('axios');

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/results`;

export default class Result extends Component{


  constructor(props){
    super(props);
    this.state = {
      id: props.match.params.id,
      resultData: null,
      answerQuestions: [],
      dimensions: [],
      avgMotivational: 0
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
          result={aq.answer.resultado}
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
    let result = total/n;
    return isNaN(result)?"":result.toFixed(2) ;
  }

  getAvgMotivational = () => {
    const {answerQuestions} = this.state;
    let n=0;
    let total =0;
    answerQuestions.forEach(aq => {
      if(aq.dimension == 43){
        n+=1;
        total+= aq.answer.rating;
      }
      
    });
    let result = total/n;
    return isNaN(result)?"":result.toFixed(2) ;
  }

  getAvgImpact = () => {
    /**Iterate through dimensions and find avg by dimension */
    const {dimensions,answerQuestions} = this.state;
    let n=0;
    let total =0;
    dimensions.forEach(d => {
      let nD=0;
      let totalD = 0;
      answerQuestions.forEach(aq => {
        if(aq.dimension != 43 && aq.dimension == d.id){
          nD+=1;
          totalD+= aq.answer.impact;
        }
      });
      if(nD!= 0){
        n+=1;
        total+= totalD/nD;
      }
    });
    let result = total/n;
    return isNaN(result)?"":result.toFixed(2) ;
  }

  getAvgCommunication = () => {
    /**Iterate through dimensions and find avg by dimension */
    const {dimensions,answerQuestions} = this.state;
    let n=0;
    let total =0;
    dimensions.forEach(d => {
      let nD=0;
      let totalD = 0;
      answerQuestions.forEach(aq => {
        if(aq.dimension != 43 && aq.dimension == d.id){
          nD+=1;
          totalD+= aq.answer.communication;
        }
      });
      if(nD!= 0){
        n+=1;
        total+= totalD/nD;
      }
    });
    let result = total/n;
    return isNaN(result)?"":result.toFixed(2) ;
  }

  getAvgRating = () => {
    /**Iterate through dimensions and find avg by dimension */
    const {dimensions,answerQuestions} = this.state;
    let n=0;
    let total =0;
    dimensions.forEach(d => {
      let nD=0;
      let totalD = 0;
      answerQuestions.forEach(aq => {
        if(aq.dimension != 43 && aq.dimension == d.id){
          nD+=1;
          totalD+= aq.answer.rating;
        }
      });
      if(nD!= 0){
        n+=1;
        total+= totalD/nD;
      }
    });
    let result = total/n;
    return isNaN(result)?"":result.toFixed(2) ;
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
         <Helmet>
          <title>{ data.attributes.candidate.name}</title>
        </Helmet>
        <div className="row d-flex justify-content-around">
        <table className="table col-sm-5 table-bordered mt-4">
          <tbody>
          <tr>
            <td className="font-weight-bold">CANDIDATO</td>
            <td>{data.attributes.candidate.name}</td>
          </tr>
          <tr>
          <td className="font-weight-bold">PUESTO</td>
            <td>{data.attributes.position}</td>
          </tr>
          <tr>
          <td className="font-weight-bold">ENTREVISTADOR</td>
            <td>{data.attributes.user.name + " " + data.attributes.user.last_name}</td>
          </tr>

          <tr >
          <td className="font-weight-bold">COMPAÑIA</td>
            <td>{data.attributes.company}</td>
          </tr>
          </tbody>
        </table>
        
        <table className="table col-sm-3 table-bordered mt-4 ml-4 float-rigth">
          <tbody>
            <tr>
              <td className="font-weight-bold">Nota total</td>
              <td>{this.getAvgRating()}</td>
            </tr>
            <tr>
              <td>Impacto</td>
              <td>{this.getAvgImpact()}</td>
            </tr>
            <tr>
              <td>Comunicación</td>
              <td>{this.getAvgCommunication()}</td>
            </tr>
            <tr>
              <td className="font-weight-bold">C. Motivacional</td>
              <td>{this.getAvgMotivational()}</td>
            </tr>
          </tbody>
        </table>
        </div>
        {/** Section of dimensions and the resumes that belongs to it */}
        {data.attributes.dimensions.map(d => 
          <div className="container-fluid">
            <div className="">
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
        
        {answerQuestions.sort((a, b) => (a.id > b.id)? 1 : -1).map(aq => 
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


