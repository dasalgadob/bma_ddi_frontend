import React, { Component } from 'react';
import MotivationalAnswer from './../answers/MotivationalAnswer';
import DimensionalAnswer from './../answers/DimensionalAnswer';
import { Helmet } from 'react-helmet';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';


const axios = require('axios');

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/results`;

class Result extends Component{


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
      const { t, i18n } = this.props;
      const language = i18n.language == "es"? "spanish":"english";
      return(
      <MotivationalAnswer
          title={aq.question.name?aq.question.name[language]:""}
          question={aq.question.translation[language]}
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
      const { t, i18n } = this.props;
      const language = i18n.language == "es"? "spanish":"english";
      return(
      <DimensionalAnswer
          question={aq.question.translation[language]}
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
    const { t, i18n } = this.props;
    const language = i18n.language == "es"? "spanish":"english";
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

        <button onClick={() => window.print()}
        className=" btn btn-primary ml-4">
            <FontAwesomeIcon icon={faFilePdf} /> 
        </button>
        <div className="row d-flex justify-content-around">
        <table className="table col-sm-5 table-bordered mt-4">
          <tbody>
          <tr>
            <td className="font-weight-bold">{t('result.candidate')}</td>
            <td>{data.attributes.candidate.name}</td>
          </tr>
          <tr>
          <td className="font-weight-bold">{t('result.position')}</td>
            <td>{data.attributes.position}</td>
          </tr>
          <tr>
          <td className="font-weight-bold">{t('result.interviewer')}</td>
            <td>{data.attributes.user.name + " " + data.attributes.user.last_name}</td>
          </tr>

          <tr >
          <td className="font-weight-bold">{t('result.company')}</td>
            <td>{data.attributes.company}</td>
          </tr>
          </tbody>
        </table>
        
        <table className="table col-sm-3 table-bordered mt-4 ml-4 float-rigth">
          <tbody>
            <tr>
              <td className="font-weight-bold">{t('result.final_mark')}</td>
              <td>{this.getAvgRating()}</td>
            </tr>
            <tr>
              <td>{t('result.impact')}</td>
              <td>{this.getAvgImpact()}</td>
            </tr>
            <tr>
              <td>{t('result.comunication')}</td>
              <td>{this.getAvgCommunication()}</td>
            </tr>
            <tr>
              <td className="font-weight-bold">{t('result.motivational_competence')}</td>
              <td>{this.getAvgMotivational()}</td>
            </tr>
          </tbody>
        </table>
        </div>
        {/** Section of dimensions and the resumes that belongs to it */}
        {data.attributes.dimensions.map(d => 
          <div className="container-fluid">
            <div className="">
          <h4 className="font-weight-bold mt-4">{d[language]}</h4>
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
          {d[language]}
          </h5>
          <p  className="text-secondary ">{t('result.score')}: &nbsp;{this.averageRatingDimension(d.id)}</p>
          {answerQuestions.map( aq => 
            <div>
              {this.showDimensionalAnswer(aq, d.id)}
            </div>
          )}
          </div>)
        }

        


        <h4 className="mt-4">{t('result.motivational_compatibility')}</h4>
        {/** Iterate through all the answerQuestions then choose only those that belongs to the 43 dimension */}
        
        {answerQuestions.sort((a, b) => (a.id > b.id)? 1 : -1).map(aq => 
          <div>{this.showMotivationalAnswer(aq)}</div>
        )}

        <h4 className="mt-4">{t('result.compensation_movility')}</h4>
      <div className="mt-2">
        <p><span  className="font-weight-bold">{t('result.base_salary')}: &nbsp;</span>{data.attributes.base_salary}</p>
        <p><span className="font-weight-bold">{t('result.benefits')}: &nbsp;</span>{data.attributes.benefits}</p>

        <p><span className="font-weight-bold">{t('result.salary_expectations')}: &nbsp;</span>{data.attributes.salary_expectations}</p>
        <p><span className="font-weight-bold">{t('result.phone_number')}: &nbsp;</span>{data.attributes.phone_number}</p>
        <p><span className="font-weight-bold">{t('result.country_of_residence')}: &nbsp;</span>{data.attributes.country_of_residence}</p>
        <p><span className="font-weight-bold">{t('result.geographical_areas')}: &nbsp;</span>{data.attributes.geographical_areas}</p>
      </div>

      </div>
    );
  }


}

  export default withTranslation()(Result);


