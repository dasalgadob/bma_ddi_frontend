import React, {Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Dimension from './Dimension';
const axios = require('axios');

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/dimensions`;

export default class Interview extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: props.name? props.name: '',
            company: props.company ? props.company : '',
            isDimensionsActive: true,
            dimensionsOnSelect: null,
            currentDimension: null,
            dimensionsSelected: []
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
            isDimensionsActive: true
        });
    }

    onChangeIsDimensionsNotActive(){
        this.setState({
            isDimensionsActive: false
        });
    }

    render(){
        const {isDimensionsActive, dimensionsOnSelect, dimensionsSelected} = this.state;
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

            <form className="container mt-4">
                <fieldset>
                <div className="row align-items-center">
                    <div className="form-group col-md-6">
                    <label htmlFor="name" className=" col-form-label col-form-label-sm mr-2">Nombre de la Entrevista: </label>
                    <input type="text" id="name" className="form-control" onChange={this.onInterviewChange}></input>
                    </div>
                    <div className="form-group col-md-6">
                    <label htmlFor="company" className=" col-form-label col-form-label-sm mr-2">Nombre de la Compañia:</label>
                    <input type="text" id="company" className="form-control" onChange={this.onCompanyChange}></input>
                    </div>
                </div>
                </fieldset>
                <div className="row align-items-center mt-2">
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
                </div>
            </form>

            <div id="dimensionsSelected">
                {dimensionsSelected.map(
                    (d) => 
                    <Dimension id={d.data.id} 
                               name={d['data']['attributes']['name']} 
                               description={d.data.attributes.description}
                               questions={d.included} ></Dimension>
                    
                )} 
            </div>

        </div>);
    }
}