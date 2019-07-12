import React, { Component } from 'react';
import Interview from './Interview';

export default class NewInterview extends Component {
  render(){
    return (
      <div>
          <h2>Crear Entrevista</h2>
          <Interview></Interview>
      </div>
    );
  }
}