import React, { Component } from 'react';



export default class MotivationalAnswer extends Component{

    render(){
        return(
        <div className="container ml-2 mt-4">
            <h4 className="font-weight-bold">{this.props.title}</h4>
        <p className={this.props.mandatory?"font-weight-bold":""+ " mt-2"}>{this.props.question}</p>
          <div className="border border-secondary row">
            <div className="col-sm-10 border border-secondary">
              <p className="text-info">Respuesta</p>
              <p>{this.props.answer}</p>
            </div>
            <div className="col-sm-2 border border-secondary">
              <p  className="text-info">Puntos</p>
              <p>{this.props.score}</p>
            </div>
          </div>
        </div>);
    }
}