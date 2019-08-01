import React, {Component} from 'react';
import Rating from '@prontopro/react-rating';
import NavDimensions from './NavDimensions';
import AnswersDimensions from './AnswersDimensions';
import MenuCandidate from './../candidates/MenuCandidate';
import NavigationButtons from './NavigationButtons';
import AnswersMotivational from './AnswersMotivational';
import { Alert } from 'reactstrap';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Redirect } from 'react-router-dom';
const axios = require('axios');


const POST_URL = `${process.env.REACT_APP_BACKEND_URL}/candidates`;
const POST_URL_RESULT = `${process.env.REACT_APP_BACKEND_URL}/results`;
const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/interviews`;
const ANSWERS_URL = `${process.env.REACT_APP_BACKEND_URL}/answers`;
const QUESTIONS_URL = `${process.env.REACT_APP_BACKEND_URL}/questions`;

export default class FillInterview extends Component{

    constructor(props){
        super(props);

        this.state= {
            id: null,
            fields: {
                idCandidate: null,
                name: '',
                email: '',
                idResult: null,
                position: '',
                company: '',
                baseSalary: "",
                benefits: "",
                salaryExpectations: '',
                geographicalAreas: "",
                answersDimensions: new Map(),
                answersMotivational: new Map(),
                isNotFinished: true
            },
            dimensions: [],
            fieldErrors: [],
            idInterview: props.match.params.id,
            interviewData: null,
            styleMenuCandidates: {display: 'block'},
            styleMenuInterview: {display: 'none'},
            isFillDimensionsTab: true,
            isMotivationalCompetenceTab: false,
            isCompensationTab: false,
            /**Style for filling questions */
            styleFillDimensions: {display: 'block'}, 
            styleMotivationalCompetence: {display: 'none'},
            styleCompensation: {display: 'none'},
            currentDimension: null,
            visibleAlert: false,
            modal: false,
            redirect: false
        };
    }

    componentDidMount() {
        console.log("idInter:" + this.state.idInterview);
        this.loadInterviewFromServer();
    }

    loadMandatoryQuestionsFromServer = () => {
        const {answersDimensions} = this.state.fields;
        const {fields, interviewData} = this.state;

        console.log('loadMandatoryQuestionsFromServer:');
        console.log(interviewData);
        
        let self = this;
        axios.get(`${QUESTIONS_URL}?mandatory=true&sort=id&direction=desc`)//it is done this way for the general question to become the first one
        .then(function (response) {
            // handle success
            console.log('loadMandatoryQuestionsFromServer:');
            console.log(response.data);
            const mandQuestions = response.data.data;

            mandQuestions.forEach((e) => {
                if(e.type == "question"){
                    interviewData.included.unshift(e);
                    answersDimensions.set(e.id, {id: e.id, resume: '',
                                    rating: 0,
                                        dimension_id: e.attributes.dimension_id,
                                    answer_id: null, 
                                    questionName: e.attributes.name?e.attributes.name.spanish:null})
                }                        
            });

            fields.answersDimensions = answersDimensions;
            self.setState({fields });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });   
    }

    loadInterviewFromServer = () => {

        const {fields} = this.state;
        let self = this;
        axios.get(`${PATH_BASE}/${this.state.idInterview}`)
        .then(function (response) {
            // handle success
            console.log('loadInterviewFromServer:');
            console.log(response.data);
            const dataAnswer = response.data.data;
            let currentDimension = null;
            if(dataAnswer.attributes.dimensions.length > 0){
                currentDimension = dataAnswer.attributes.dimensions[0].id;
            }
            self.createAnswersToDimensionQuestions(response.data.included);
            self.setDimensions(response.data.included);
            fields.company = response.data.data.attributes.company;
            fields.position = response.data.data.attributes.name;
            self.setState({
                interviewData: response.data,
                currentDimension,
                fields
            },() =>{ self.loadMandatoryQuestionsFromServer()}); //Loads questions mandatory to included and its answers
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });   
    }

    /** Load the dimensions to use them later on validations for the answers to dimensions and
     * motivational
     */
    setDimensions = (dimList) => {
        const {dimensions} = this.state;
        let dimensionsNew = [];
        console.log('setDimensions');
        console.log(dimList);
        dimList.forEach((e) => {
            if(e.type == "dimension"){
                dimensionsNew = dimensionsNew.concat(e);
            }                        
        });
        console.log(dimensionsNew);
        this.setState({dimensions: dimensionsNew });
    } 

    createAnswersToDimensionQuestions = (questionsList) => {
        const fields = this.state.fields;
        const {answersDimensions} = this.state.fields;
        console.log('createAnswersToDimensionQuestions');
        console.log(questionsList);
        questionsList.forEach((e) => {
            if(e.type == "question"){
            answersDimensions.set(e.id, {id: e.id, situation: '', action: '', resultado: '', resume: '',
                                rating: 0, impact: 0, communication: 0,
                                    dimension_id: e.attributes.dimension_id,
                                answer_id: null, 
                                questionName: e.attributes.name?e.attributes.name.spanish:null})
            }                        
        });

        fields.answersDimensions = answersDimensions;
        console.log(answersDimensions);
        this.setState({fields });
    }

    onSaveCandidate = (e) => {
        console.log("candidate saving");
        const {name, email} = this.state.fields;
        const fields = this.state.fields;
        e.preventDefault();
        console.log("Do notgnb");
        const headers = JSON.parse(localStorage.getItem('user'));
        let self = this;
        axios({
            method: 'post',
            url: `${POST_URL}`,
            data: 
            {candidate: {name: name, email: email}},
            headers: headers
            })
        .then(function (response) {
            // handle success
            console.log("success candidate saving");
            console.log(response.data);
            fields['idCandidate'] = response.data.id
            self.setState({ fields}, self.chooseIfcreateOrUpdateResult);
            //self.chooseIfcreateOrUpdateResult();
            self.changeMenu();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    onChooseCandidate = (e) => {
        const fields = this.state.fields;
        console.log('on choose candidate');
        fields['idCandidate'] = parseInt(e.target.id);
        this.setState({fields}, ()  => {this.chooseIfcreateOrUpdateResult()});
        //this.chooseIfcreateOrUpdateResult();
        this.changeMenu();
        console.log('e.target.value');
        console.log(e.target.id);
    }

    onInputChange = (e) => {
        const fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({fields});
        console.log("onInputChange");
        console.log(fields);
    }

    onInputChangeAnswerDimension = (e) => {
        console.log('onInputChangeAnswerDimension');
        const {fields} = this.state;
        const answersDimensions = this.state.fields.answersDimensions;
        //find position on array by id
        let idQuestion = e.target.id;
        console.log(e.target.name);
        const ansDimension = fields.answersDimensions.get(e.target.id)
        ansDimension[e.target.name] = e.target.value;
        fields.answersDimensions.set(e.target.id, ansDimension);
        this.setState({fields},console.log(this.state.fields.answersDimensions));
        
        //update the state to the e.target.value value
    }

    /**
     * Handles onClick for rating Component
     * Params: 
     *  name: indicates the name of the attribute question
     *  idQ: id of question that was rated
     *  number: The numeric valuation given 
     *  e: event generated by javascript when onClick
     */
    onInputChangeAnswerRating = (name, idQ, number, e) => {
        console.log('onInputChangeAnswerRating');
        const {fields} = this.state;
        console.log("number:" + number);
        console.log("id:" + idQ);
        console.log("name:" +name);
        const ansDimension = fields.answersDimensions.get(idQ)
        ansDimension[name] = number;
        fields.answersDimensions.set(idQ, ansDimension);
        this.setState({fields}, this.onBlurAutoSave(idQ, ansDimension.dimension_id==43?'m':'d'));

    }

    changeMenu = () => {
        console.log('change menu');
        this.setState({
            styleMenuCandidates: {display: "none"},
            styleMenuInterview: {display: "block"}
        });
    }

    changeMenuToCandidates = () => {
        console.log('changeMenuToCandidates');
        this.setState({
            styleMenuCandidates: {display: "block"},
            styleMenuInterview: {display: "none"}
        });
    }

    onChangeIsFillDimensionsTab = (e) => {
        this.setState({
            isFillDimensionsTab: true,
            isMotivationalCompetenceTab: false,
            isCompensationTab: false,
            styleFillDimensions: {display: 'block'},
            styleMotivationalCompetence: {display: 'none'},
            styleCompensation: {display: 'none'}
        });
    }

    onChangeIsMotivationalCompetenceTab = (e) => {
        this.setState({
            isFillDimensionsTab: false,
            isMotivationalCompetenceTab: true,
            isCompensationTab: false,
            styleFillDimensions: {display: 'none'},
            styleMotivationalCompetence: {display: 'block'},
            styleCompensation: {display: 'none'}
        });
    }

    onChangeIsCompensationTab = (e) => {
        this.setState({
            isFillDimensionsTab: false,
            isMotivationalCompetenceTab: false,
            isCompensationTab: true,
            styleFillDimensions: {display: 'none'},
            styleMotivationalCompetence: {display: 'none'},
            styleCompensation: {display: 'block'}
        });
    }

    onChangeNavDimensionsTab = (e) => {
        console.log("id dim: " + e.target.id);
        this.setState({currentDimension:  e.target.id});
    }

    chooseIfcreateOrUpdateResult = () => {
        if(!this.state.fields.idResult){
            console.log("createResult");
            this.createResult();
        }else{
            console.log("updateResult");
            this.updateResult();
        }
    }

    /**
     * Make a post request with the info of id_user based on the one selected or just created
     */
    createResult = () => {
        console.log("createResult");
        const {idCandidate} = this.state.fields;
        const fields = this.state.fields;
        const headers = JSON.parse(localStorage.getItem('user'));
        let self = this;
        const resultJSON = {
            result: {candidate_id: idCandidate}
        };
        console.log(resultJSON);
        axios({
            method: 'post',
            url: `${POST_URL_RESULT}`,
            data: 
            {result: {candidate_id: idCandidate}},
            headers: headers
            })
        .then(function (response) {
            // handle success
            console.log("success createResult");
            console.log(response.data);
            fields['idResult'] = response.data.id;
            self.setState({fields});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    updateResult = () => {
        console.log("updateResult");
        const {idCandidate} = this.state.fields;
        const fields = this.state.fields;
        const headers = JSON.parse(localStorage.getItem('user'));
        let self = this;
        axios({
            method: 'patch',
            url: `${POST_URL_RESULT}/${self.state.fields.idResult}`,
            data: 
            {result: {candidate_id: idCandidate, position: fields.position, company: fields.company,
                        base_salary: fields.baseSalary, benefits: fields.benefits, 
                        salary_expectations: fields.salaryExpectations, 
                        geographical_areas: fields.geographicalAreas, 
                        is_not_finished: fields.isNotFinished
                     }
            },
            headers: headers
            })
        .then(function (response) {
            // handle success
            console.log("success updateResult");
            console.log(response.data);
            fields['idResult'] = response.data.id;
            self.setState({fields,
                visibleAlert:true},()=>{
                    window.setTimeout(()=>{
                      self.setState({visibleAlert:false})
                    },2000)
                  });

            if(!fields.isNotFinished){
                self.setRedirect();
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    validatesDimensionQuestions = () => {
        const {fieldErrors, fields} = this.state;
        let dimensionErrors = [];
        /**
         * Iterate through the questions find witch fields are not filled 
         * the add them to the list of field errors
         */
        fields.answersDimensions.forEach((a) => {
            console.log(a);
            //Skip questions from motivational dimension
            if(a.dimension_id != 43){
                dimensionErrors =  dimensionErrors.concat(this.validatesDimensionAnswer(a));
            }
        }
            
        );

         /** If there are no errors continue next tab */
        if(dimensionErrors.length == 0){
            console.log("Go to tab motivational questions");
            this.onChangeIsMotivationalCompetenceTab();
        }
         /** Else show the error message */
         else{
             console.log("dimensionErrors");
             console.log(dimensionErrors);
             this.setState({
                 fieldErrors: dimensionErrors,
                 modal: true
             })
         }
    }

    validatesMotivationalQuestions = () => {
        const {fieldErrors, fields} = this.state;
        let dimensionErrors = [];
        /**
         * Iterate through the questions find witch fields are not filled 
         * the add them to the list of field errors
         */
        fields.answersDimensions.forEach((a) => {
            console.log(a);
            //Skip questions from motivational dimension
            if(a.dimension_id == 43){
                dimensionErrors =  dimensionErrors.concat(this.validatesMotivationalAnswer(a));
            }
        }
            
        );

         /** If there are no errors continue next tab */
        if(dimensionErrors.length == 0){
            console.log("Go to tab compensation questions");
            this.onChangeIsCompensationTab();
        }
         /** Else show the error message */
         else{
             console.log("dimensionErrors");
             console.log(dimensionErrors);
             this.setState({
                 fieldErrors: dimensionErrors,
                 modal: true
             })
         }
    }


   /**
    * Validates an unique validation question and return a list of the errors
    * 
    * Params:
    *   q: receive an Object of question with its attributes
    * 
    * Return:
    *   return an array with a list of errors for that question. If no error on question returns an
    *   empty array.
    *  */ 
    validatesDimensionAnswer = (q) => {
        //Get dimension name
        let dimensionName = "";
        this.state.dimensions.forEach(d => {
            if(d.id == q.dimension_id){
                dimensionName = d.attributes.name.spanish;
            }
        });
        let answerError = [];

        //Iterate through attributes of question
        Object.keys(q).forEach((e) => {
            //The field resume is not going to be mandatory
            if((q[e] == '' || q[e] == 0) && e != 'resume'){
                answerError.push(`El atributo  <span class="font-weight-bold">${e}</span> que pertenece a la dimensión motivacional <span class="font-weight-bold">${dimensionName}</span> se encuentra vacio o nulo.`);
            }
        });
            //if attribute empty or zero add message of error showing the dimension
            // and attribute that are missing to fill

        return answerError;
    }


    validatesMotivationalAnswer = (q) => {
        //Get dimension name
        let dimensionName = "Motivacional";
        let answerError = [];

        //Iterate through attributes of question
        Object.keys(q).forEach((e) => {
            if((q[e] == '' || q[e] == 0) && (e =='resume' || e== 'rating' )){
                answerError.push(`El atributo  <span class="font-weight-bold">${e}</span> que pertenece a la dimensión <span class="font-weight-bold">${q.questionName}</span> se encuentra vacio o nulo.`);
            }
        });
            //if attribute empty or zero add message of error showing the dimension
            // and attribute that are missing to fill

        return answerError;
    }

    changeMenuToDimensions = () => {

    }



    onBlurAutoSave = (idQuestion, type) => {
        const {answersDimensions} = this.state.fields;
        console.log("onBlurAutosave:" + idQuestion);
        //Validates if the answer is completely filled
        let errors = "";
        if(type== 'd'){
            errors = this.validatesDimensionAnswer(answersDimensions.get(idQuestion));
        }else{
            errors = this.validatesMotivationalAnswer(answersDimensions.get(idQuestion));
        }
        console.log("errors");
        console.log(errors);
        //Regardless if it has errors every time in onBlur the field is saved
        this.saveAnswer(idQuestion);

    }

    saveAnswer = idQ => {
     /**If it has an answer_id update the answer if it not create an answer */
     const {answersDimensions,  idResult} = this.state.fields;
     const ansToSave = answersDimensions.get(idQ);

     const headers = JSON.parse(localStorage.getItem('user'));
        //console.log("idInt:" + idInterview);
     let method = ansToSave.answer_id?'patch':'post';
     let self = this;


     axios({
            method: method,
            url: `${ANSWERS_URL}/${ ansToSave.answer_id? ansToSave.answer_id:'' }`,
            data: 
            {answer: {action: ansToSave.action, 
                            situation: ansToSave.situation, 
                            resultado: ansToSave.resultado,
                            resume: ansToSave.resume,
                            rating: ansToSave.rating,
                            impact: ansToSave.impact,
                            communication:  ansToSave.communication,
                            result_id: idResult,
                            question_id: ansToSave.id

                        }},
            headers: headers
            })
        .then(function (response) {
            // handle success
            console.log("saveAnswer");
            console.log(response.data);
            //self.setState({id: response.data.id});
            //self.setRedirect();
            /**If it worked show that was autosaved */
            ansToSave['answer_id'] = response.data.id;
            answersDimensions.set(idQ, ansToSave);
            self.setState({visibleAlert:true,
                answersDimensions 
            },()=>{
                window.setTimeout(()=>{
                  self.setState({visibleAlert:false})
                },2000)
              });
            console.log("saveAnswer successful");
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    }

    validatesCompensationQuestions = () => {
        const {fields} = this.state;
        fields.isNotFinished = false;
        this.setState({fields},
            this.updateResult());
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

    toggle = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

    renderRedirect = () => {
    if (this.state.redirect ) {
        return <Redirect to={'/results/'+this.state.fields.idResult} />
    }
    }  


    render(){
        const alertStyle = {position: "fixed",
            top: "100px", 
            left:"2%",
            width: "30%",
            zIndex: 100};

        let motivacionalAnswers = [];

        console.log(this.state);
        const {styleMenuCandidates, styleMenuInterview, interviewData, currentDimension} = this.state;

        if(!interviewData){
            return <div></div>
        }

        return(<div >
            {this.renderRedirect()}
            <MenuCandidate onInputChange={this.onInputChange} 
                           onSaveCandidate={this.onSaveCandidate}
                           onChooseCandidate={this.onChooseCandidate}
                           style={styleMenuCandidates}>
            </MenuCandidate>
            


        <div style={styleMenuInterview}>
            <h3>Rellenar entrevista</h3>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    
                    <a className={`nav-link ${this.state.isFillDimensionsTab? "active": ''}` }
                        onClick={this.onChangeIsFillDimensionsTab} 
                        href="#"><h3>1</h3>Rellenar las preguntas de las dimensiones</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${this.state.isMotivationalCompetenceTab? "active": ''}` }
                        onClick={this.onChangeIsMotivationalCompetenceTab}  
                        href="#"><h3>2</h3>Competencia motivacional</a>
                </li>

                <li className="nav-item">
                    <a className={`nav-link ${this.state.isCompensationTab? "active": ''}` }
                        onClick={this.onChangeIsCompensationTab}  
                        href="#"><h3>3</h3>Compensación actual y movilidad
                        </a>
                </li>
            </ul>

            {/** Content for fill dimensions */}
            <div className="mt-2"  style={this.state.styleFillDimensions}>
            {this.state.visibleAlert?
                    <div className="myAlert-top alert alert-success" style={alertStyle}>
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    Se ha guardado los cambios realizados.
                    </div>:<div></div>
            }

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Datos faltantes</ModalHeader>
                <ModalBody>
                    <ul>
                    {this.state.fieldErrors.map(fe =>
                        <li dangerouslySetInnerHTML={{__html: fe}}></li>)}
                    </ul>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Entendido</Button>{' '}
                </ModalFooter>
                </Modal>


                <NavigationButtons handleBeforeButton={this.changeMenuToCandidates}
                                   handleNextButton={this.validatesDimensionQuestions}>

                </NavigationButtons>
                
                <NavDimensions dimensions={this.state.interviewData.data.attributes['dimensions']} 
                onClick={this.onChangeNavDimensionsTab}>

                </NavDimensions>

                <AnswersDimensions questions={this.state.interviewData.included}
                                   onInputChangeAnswerDimension={this.onInputChangeAnswerDimension}
                                   onInputChangeAnswerRating={this.onInputChangeAnswerRating}
                                   onBlurAutoSave = { this.onBlurAutoSave }     
                                   dimensionId={currentDimension}
                                   dimension={2}>
                </AnswersDimensions>
            </div>

            {/** Content for motivational questions */}
            <div className="container mx-3" style={this.state.styleMotivationalCompetence}>
            {this.state.visibleAlert?
                    <div className="myAlert-top alert alert-success" style={alertStyle}>
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    Se ha guardado los cambios realizados.
                    </div>:<div></div>
            }

            <NavigationButtons handleBeforeButton={this.onChangeIsFillDimensionsTab}
                                   handleNextButton={this.validatesMotivationalQuestions}>
            </NavigationButtons>
            <h4 className="mt-4">Compatibilidad motivacional</h4>
            <p>La medida en que las actividades y responsabilidades del puesto, la modalidad de operación y los valores de la organización, y la comunidad en la cual el individuo vivirá, se corresponden con el tipo de ambiente que brinda satisfacción personal; el grado en el cual el propio trabajo es personalmente satisfactorio.</p>
            
            <br>
            </br>
                
             <AnswersMotivational
                questions={this.state.interviewData.included}
                dimensionId={43}
                onInputChangeAnswerDimension={this.onInputChangeAnswerDimension}
                onInputChangeAnswerRating={this.onInputChangeAnswerRating}
                onBlurAutoSave = { this.onBlurAutoSave }     
                dimensionId={currentDimension}
                >
            </AnswersMotivational>     
            </div>

            {/** Content for compensation and mobility */}

            <div className="container-fluid mx-4" style={this.state.styleCompensation}>
            {this.state.visibleAlert?
                    <div className="myAlert-top alert alert-success" style={alertStyle}>
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    Se ha guardado los cambios realizados.
                    </div>:<div></div>
            }
            <NavigationButtons handleBeforeButton={this.onChangeIsMotivationalCompetenceTab}
                                   handleNextButton={this.validatesCompensationQuestions}>
            </NavigationButtons>
            <h4 className="mt-4">Compensacion actual y movilidad</h4>
            <p>Averigua cual es la situación del candidato y donde quiere llegar.</p>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
                <label htmlFor="exampleInputPassword1" className="align-left ">Compañía para la que entrevista</label>
                <input type="text"
                        name="company"
                        className="form-control " 
                        id="exampleInputPassword1" 
                        required="required"
                        value={this.state.fields.company}
                        onChange={this.onInputChange}
                        onBlur={this.updateResult}/>
            </div>

            <div className="form-group row">
                <label htmlFor="exampleInputPassword1" className="align-left">Puesto para el que entrevista</label>
                <input type="text"
                        name="position"
                        className="form-control" 
                        id="exampleInputPassword1" 
                        required="required"
                        value={this.state.fields.position}
                        onChange={this.onInputChange}
                        onBlur={this.updateResult}/>
            </div>

            <div className="form-group row">
                <label htmlFor="exampleInputPassword1" className="align-left">Salario base</label>
                <input type="text"
                        name="baseSalary"
                        className="form-control" 
                        id="exampleInputPassword1" 
                        required="required"
                        onChange={this.onInputChange}
                        onBlur={this.updateResult}/>
            </div>

            <div className="form-group row">
                <label htmlFor="exampleInputPassword1" className="align-left">Beneficios</label>
                <input type="text"
                        name="benefits"
                        className="form-control" 
                        id="exampleInputPassword1" 
                        required="required"
                        onChange={this.onInputChange}
                        onBlur={this.updateResult}/>
            </div>

            <div className="form-group row">
                <label htmlFor="exampleInputPassword1" className="align-left">Expectativas de salario</label>
                <input type="text"
                        name="salaryExpectations"
                        className="form-control" 
                        id="exampleInputPassword1" 
                        required="required"
                        onChange={this.onInputChange}
                        onBlur={this.updateResult}/>
            </div>

            <div className="form-group row">
                <label htmlFor="exampleInputPassword1" className="align-left">Áreas geográficas</label>
                <input type="text"
                        name="geographicalAreas"
                        className="form-control" 
                        id="exampleInputPassword1" 
                        required="required"
                        onChange={this.onInputChange}
                        onBlur={this.updateResult}/>
            </div>
              
            </form>
            </div>
        </div>
        </div>
        );
    }
}
