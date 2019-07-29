import React, { Component } from 'react';



export default class MotivationalAnswer extends Component{

    render(){
        return(
        <div className="container ml-2 mt-4">
            <h5 className="font-weight-bold">{this.props.title}</h5>
        <p className="font-weight-bold">{this.props.question}</p>
          <div className="border border-dark row">
            <div className="col-sm-10 border border-dark">
              <p className="font-weight-bold">Respuesta</p>
              <p>{this.props.answer}</p>
            </div>
            <div className="col-sm-2 border border-dark">
              <p  className="font-weight-bold">Puntos</p>
              <p>{this.props.score}</p>
            </div>
          </div>
        </div>);
    }
}