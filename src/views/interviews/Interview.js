import React, {Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Dimension from './Dimension';
import { Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { nullLiteral } from '@babel/types';
const axios = require('axios');

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/dimensions`;
const POST_URL = `${process.env.REACT_APP_BACKEND_URL}/interviews`;
class Interview extends Component{
    constructor(props){
        super(props);
        this.state = {
            idInterview: props.match.params.id ,
            currentInterview: null,
            name: props.name? props.name: '',
            company: props.company ? props.company : '',
            isDimensionsActive: true,
            dimensionsOnSelect: null,
            currentDimension: null,
            dimensionsSelected: [],
            questionsSelected: {},
            motivationalDimension: {},
            styleDimensionsQuestions: {display: 'block'},
            styleMotivationalQuestions: {display: 'none'},
            redirect: false,
            isFill: false

        };


        this.setDimensions = this.setDimensions.bind(this);
        this.onCurrentDimensionChange = this.onCurrentDimensionChange.bind(this);
        this.onChangeIsDimensionsActive = this.onChangeIsDimensionsActive.bind(this);
        this.onChangeIsDimensionsNotActive = this.onChangeIsDimensionsNotActive.bind(this);
        this.handleCurrentDimensionAdding = this.handleCurrentDimensionAdding.bind(this);
    }

    handleCurrentDimensionAdding = (e) => {
        e.preventDefault();
        this.addDimensionToDimensionsSelected(this.state.currentDimension);
        
    }

    /**
     * Make the api call to add the data to dimensions selected
     * 
     * Params:
     *  dimensionId: Receives the dimension that is going to be queried to be added to dimensions 
     *  selected.
     */
    addDimensionToDimensionsSelected =  (dimensionId) => {
        let self = this;
        axios.get(`${PATH_BASE}/${dimensionId}`)
        .then(function (response) {
            // handle success
            console.log(response.data);
            self.setState({
                dimensionsSelected: [response.data].concat(self.state.dimensionsSelected) 
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });   
    }

    componentDidMount(){
        this.loadDimensionsFromServer();
        this.loadMotivationalDimension();
        //console.log("componentDidMount:" + this.state.idInterview);
        
        if(this.state.idInterview != 'new'){
            this.loadInterviewFromServer();
        }
    }

    loadInterviewFromServer = () => {
        //console.log("loadInterviewFromServer");
        //console.log(this.state.idInterview);

        let self = this;
        axios.get(`${POST_URL}/${this.state.idInterview}`)
        .then(function (response) {
            // handle success
            console.log('loadInterviewFromServer:');
            console.log(response.data);
            self.setState({
                currentInterview: response.data,
                 name: response.data.data.attributes.name,
                 company: response.data.data.attributes.company
            },  );

            self.updateQuestionsSelected(response.data.included);
            /** Load the dimensions that belong to the interview */
            
            for(let i=0; i< response.data.data.attributes.dimensions.length; i++){
                console.log("i:" + i);
                let dimensionId = response.data.data.attributes.dimensions[i]['id'];
                self.addDimensionToDimensionsSelected(dimensionId);
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

    /**
     * This function update the state for the array questions selected
     * 
     * params:
     *  questionsSelected: Array of questions with its data from select that area selected for the 
     *  current dimension.
     */
    updateQuestionsSelected = (questionsSelectedServer) => {
        const {questionsSelected } = this.state;
        questionsSelectedServer.forEach(element => {
            questionsSelected[element.id] = true;
        });
        this.setState({questionsSelected})
    }

    loadMotivationalDimension = () => {
        let self = this;
        axios.get(`${PATH_BASE}/43`)
        .then(function (response) {
            // handle success
            //console.log('loadMotivationalDimension:');
            //console.log(response.data);
            self.setState({
                motivationalDimension: response.data 
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });   
    }

    onCurrentDimensionChange(e){
        //console.log("DIm seleted:" + e.target.value);
        this.setState({currentDimension: e.target.value});
    }

    setDimensions(result){
        this.setState({dimensionsOnSelect: result});
    }

    loadDimensionsFromServer(){
        const queryURL = `${PATH_BASE}`;
        //console.log("Query URL:" + queryURL);
        fetch(queryURL)
        .then(response => response.json())
        .then(result => this.setDimensions(result))
        .catch(error => error);
    }

    onChangeIsDimensionsActive(){
        this.setState({
            isDimensionsActive: true,
            styleDimensionsQuestions: {display: 'block'},
            styleMotivationalQuestions: {display: 'none'}
        });
    }

    onChangeIsDimensionsNotActive(e){
        e.preventDefault();
        this.setState({
            isDimensionsActive: false,
            styleDimensionsQuestions: {display: 'none'},
            styleMotivationalQuestions: {display: 'block'}
        });
    }

    updateQuestionSelected = (id, checked) => {
        console.log("updateQuestionSelected");
        console.log("id: " + id);
        console.log("checked: " + checked);
        let questionsNewSelection = Object.assign({}, this.state.questionsSelected);
        questionsNewSelection[id] = checked;
        this.setState({
            questionsSelected: questionsNewSelection
        });
    }

    updateArrayQuestionsSelected = (ids, checked) => {
        console.log("updateQuestionSelected");
        //console.log("id: " + id);
        console.log("checked: " + checked);
        let questionsNewSelection = Object.assign({}, this.state.questionsSelected);
        ids.forEach(id => {
            questionsNewSelection[id] = checked;
        });
        
        this.setState({
            questionsSelected: questionsNewSelection
        });
    }


    onQuestionSelected = (e) => {
        //console.log('e.target.checked');
        this.updateQuestionSelected(e.target.id, e.target.checked );
        //console.log(e.target.checked);
        //console.log(questionsNewSelection);
        //console.log(e.target.name);
    }

    validateForm = (e) => {
        e.preventDefault();
        this.onChangeIsDimensionsNotActive(e);
    }

    saveInterview = (e) => {
        e.preventDefault();

        /**Choose based on idInterview attribute if an update or post request is needed */
        const {name, company, questionsSelected, idInterview} = this.state;
        const questionsArray = Object.keys(questionsSelected).filter((k) =>{
            if(questionsSelected[k]){
                return true;
            }
        });
        
        const headers = JSON.parse(localStorage.getItem('user'));
        //console.log("idInt:" + idInterview);
        let method = idInterview == 'new'?'post':'patch';
        let self = this;
        
        axios({
            method: method,
            url: `${POST_URL}/${ idInterview != 'new'? idInterview:'' }`,
            data: 
            {interview: {name: name, company: company, questions_array: questionsArray}},
            headers: headers
            })
        .then(function (response) {
            // handle success
            //console.log(response.data);
            self.setState({id: response.data.id});
            self.setRedirect();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

    saveAndFillInterview = (e) =>{
        this.setState({isFill: true});
        this.saveInterview(e);
    }

    onInterviewChange = (e) => {
        this.setState({name: e.target.value});
    }

    onCompanyChange = (e) => {
        this.setState({company: e.target.value});
    }

    renderRedirect = () => {
        if (this.state.redirect && this.state.isFill) {
          return <Redirect to={'/interviews/'+this.state.id+ '/fill'} />
        }else if(this.state.redirect){
            return <Redirect to={'/interviews'} />
        }
      }

      /**
       * 
       */
      onDeleteDimension = (id) => {
          const {dimensionsSelected} = this.state;
        console.log("id:"+ id);
        //Delete from dimensionsSelected
        let indexDimension = -1;
        for(let i=0; i<dimensionsSelected.length; i++){
            if(dimensionsSelected[i].data.id == id){
                indexDimension = i;
            }
        }
        console.log("index dimension:" + indexDimension);
        if(indexDimension != -1){
            dimensionsSelected.splice(indexDimension, 1);
            this.setState({
                dimensionsSelected
            });
        }
        
        //Unmark from questionsSelected

      }

    render(){
        const {isDimensionsActive, dimensionsOnSelect, dimensionsSelected, motivationalDimension} = this.state;
        console.log('this.state.dimensionsSelected');
        console.log(this.state.dimensionsSelected);

        console.log('this.state.questionsSelected');
        console.log(this.state.questionsSelected);
        console.log(this.state);

        if(!dimensionsOnSelect){
            return(<div></div>);
        }


        return(
        <div>
            {this.renderRedirect()}
            <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className={`nav-link ${isDimensionsActive? 'active': ''}`} 
                    href="#"
                    onClick={this.onChangeIsDimensionsActive}>Dimensiones y preguntas</a>
            </li>
            <li className="nav-item">
                <a className={`nav-link ${!isDimensionsActive? 'active': ''}`} 
                href="#"
                onClick={this.onChangeIsDimensionsNotActive} >Competencia motivacional</a>
            </li>

            </ul>
            <div style={this.state.styleDimensionsQuestions}>
            <form className="container mt-4" onSubmit={this.validateForm}>
                <fieldset>
                <div className="row align-items-center">
                    <div className="form-group col-md-6">
                    <label htmlFor="name" className=" col-form-label col-form-label-sm mr-2">Nombre de la Entrevista: </label>
                    <input type="text" 
                           id="name" 
                           className="form-control" 
                           onChange={this.onInterviewChange}
                           required="required"
                           value={this.state.name}></input>
                    </div>
                    <div className="form-group col-md-6">
                    <label htmlFor="company" className=" col-form-label col-form-label-sm mr-2">Nombre de la Compañia:</label>
                    <input type="text" id="company" className="form-control" 
                           onChange={this.onCompanyChange}
                           value={this.state.company}></input>
                    </div>
                </div>
                </fieldset>
                <div className="row  mt-2">
                    <div className="col-auto">
                    Selecciona una dimensión:
                    <select className="form-control" id="dimension" onChange={this.onCurrentDimensionChange}>
                        <option></option>   
                    {dimensionsOnSelect['data'].map(d => <option key={d['id']} value={d['id']} >{d['attributes']['name']['spanish']}</option>)}   
                    
                    </select>
                    </div>
                    <div className="col-auto">
                        <div className="row align-items-left mt-4">
                            <button onClick={this.handleCurrentDimensionAdding}
                            className=" btn btn-primary ">
                                <FontAwesomeIcon icon={faPlus} /> Añadir dimensión
                            </button>
                        </div>
                    </div>

                    <div className="col align-self-end">
                        <div className="">
                            <button type="submit" className="btn btn-primary align-self-end " >
                                    
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <h4 className="mt-4">Selecciona las preguntas para cada dimensión</h4>

            <div id="dimensionsSelected">
                {dimensionsSelected.map(
                    (d) => 
                    <Dimension key={d.data.id} id={d.data.id} 
                               name={d['data']['attributes']['name']} 
                               description={d.data.attributes.description}
                               questions={d.included}
                               onClick={this.onQuestionSelected}
                               questionsSelected={this.state.questionsSelected}
                               onDeleteDimension={() => this.onDeleteDimension(d.data.id)}
                               onUpdateArrayQuestionsSelected = {this.updateArrayQuestionsSelected}  ></Dimension>
                    
                )} 
            </div>

            </div>
            <div style={this.state.styleMotivationalQuestions}>
            <form className="container">
                <div className=" ">
                    <div className="d-flex flex-row mt-3">
                     <button type="button" 
                             className="btn btn-primary  mx-2 mr-auto"
                             onClick={this.onChangeIsDimensionsActive}>Atras</button>
                        <div className="btn-toolbar">
                        <button onClick={this.saveAndFillInterview} className="btn btn-primary ml-auto mx-1">Guardar y rellenar</button>
                        <button onClick={this.saveInterview} className="btn btn-primary  ml-auto mx-1">Guardar entrevista</button>
                        </div>
                    </div>
                </div>
            </form>

            <div className="container mt-4">
                 
                <h3 className="mt-10">Preguntas sobre Facetas Motivacionales</h3>

                
            </div>       
            <Dimension key={motivationalDimension.data.id} id={motivationalDimension.data.id} 
                               name={motivationalDimension['data']['attributes']['name']} 
                               description={motivationalDimension.data.attributes.description}
                               questions={motivationalDimension.included}
                               onClick={this.onQuestionSelected}
                               questionsSelected={this.state.questionsSelected} ></Dimension>                    
            </div>

        </div>);
    }
}

export default withTranslation()(Interview);