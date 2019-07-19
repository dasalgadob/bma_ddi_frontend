import React, {Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Dimension from './Dimension';
const axios = require('axios');

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/dimensions`;
const POST_URL = `${process.env.REACT_APP_BACKEND_URL}/interviews`;
export default class Interview extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: props.name? props.name: '',
            company: props.company ? props.company : '',
            isDimensionsActive: true,
            dimensionsOnSelect: null,
            currentDimension: null,
            dimensionsSelected: [],
            questionsSelected: {},
            motivationalDimension: {},
            styleDimensionsQuestions: {display: 'block'},
            styleMotivationalQuestions: {display: 'none'}
        };


        this.setDimensions = this.setDimensions.bind(this);
        this.onCurrentDimensionChange = this.onCurrentDimensionChange.bind(this);
        this.onChangeIsDimensionsActive = this.onChangeIsDimensionsActive.bind(this);
        this.onChangeIsDimensionsNotActive = this.onChangeIsDimensionsNotActive.bind(this);
        this.handleCurrentDimensionAdding = this.handleCurrentDimensionAdding.bind(this);
    }

    handleCurrentDimensionAdding = (e) => {
        e.preventDefault();
        let self = this;
        axios.get(`${PATH_BASE}/${this.state.currentDimension}`)
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
    }

    loadMotivationalDimension = () => {
        let self = this;
        axios.get(`${PATH_BASE}/43`)
        .then(function (response) {
            // handle success
            console.log(response.data);
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
        console.log("DIm seleted:" + e.target.value);
        this.setState({currentDimension: e.target.value});
    }

    setDimensions(result){
        this.setState({dimensionsOnSelect: result});
    }

    loadDimensionsFromServer(){
        const queryURL = `${PATH_BASE}`;
        console.log("Query URL:" + queryURL);
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


    onQuestionSelected = (e) => {
        console.log('e.target.checked');
        let questionsNewSelection = {...this.state.questionsSelected};
        questionsNewSelection[e.target.id] = e.target.checked;
        this.setState({
            questionsSelected: questionsNewSelection
        });
        //console.log(e.target.checked);
        console.log(questionsNewSelection);
        //console.log(e.target.name);
    }

    validateForm = (e) => {
        e.preventDefault();
        this.onChangeIsDimensionsNotActive(e);
    }

    saveInterview = (e) => {
        const {name, company, questionsSelected} = this.state;
        const questionsArray = Object.keys(questionsSelected).filter((k) =>{
            if(questionsSelected[k]){
                return true;
            }
        });
        e.preventDefault();
        const headers = JSON.parse(localStorage.getItem('user'));
        let self = this;
        axios({
            method: 'post',
            url: `${POST_URL}`,
            data: 
            {interview: {name: name, company: company, questions_array: questionsArray}},
            headers: headers
            })
        .then(function (response) {
            // handle success
            console.log(response.data);

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    }

    saveAndFillInterview = (e) =>{
        this.saveInterview(e);
        this.redirectToNewInterview(1);
    }


    /**Redirect to the filling form of interview with the proper id given */
    redirectToNewInterview = (id) => {
        console.log(id);
    }

    onInterviewChange = (e) => {
        this.setState({name: e.target.value});
    }

    onCompanyChange = (e) => {
        this.setState({company: e.target.value});
    }

    render(){
        const {isDimensionsActive, dimensionsOnSelect, dimensionsSelected, motivationalDimension} = this.state;
        console.log('this.state.dimensionsSelected');
        console.log(this.state.dimensionsSelected);

        if(!dimensionsOnSelect){
            return(<div></div>);
        }


        return(
        <div>
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
                           required="required"></input>
                    </div>
                    <div className="form-group col-md-6">
                    <label htmlFor="company" className=" col-form-label col-form-label-sm mr-2">Nombre de la Compañia:</label>
                    <input type="text" id="company" className="form-control" onChange={this.onCompanyChange}></input>
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

            <div id="dimensionsSelected">
                {dimensionsSelected.map(
                    (d) => 
                    <Dimension key={d.data.id} id={d.data.id} 
                               name={d['data']['attributes']['name']} 
                               description={d.data.attributes.description}
                               questions={d.included}
                               onClick={this.onQuestionSelected} ></Dimension>
                    
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
                 
                <h3 className="mt-10"><bold>Preguntas sobre Facetas Motivacionales</bold></h3>

                
            </div>       
            <Dimension key={motivationalDimension.data.id} id={motivationalDimension.data.id} 
                               name={motivationalDimension['data']['attributes']['name']} 
                               description={motivationalDimension.data.attributes.description}
                               questions={motivationalDimension.included}
                               onClick={this.onQuestionSelected} ></Dimension>                    
            </div>

        </div>);
    }
}