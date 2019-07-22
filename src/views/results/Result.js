import React, { Component } from 'react';

const axios = require('axios');

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/results`;

export default class Result extends Component{


  constructor(props){
    super(props);
    this.state = {
      id: props.match.params.id,
      resultData: null
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
            console.log('response.data');
            console.log(response.data);
            self.setState({
                resultData: response.data 
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

  render(){
    
    if(!this.state.resultData){
      return <div></div>
    }

    const data = this.state.resultData.data;
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


