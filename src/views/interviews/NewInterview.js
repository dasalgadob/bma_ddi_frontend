import React, { Component } from 'react';
import Interview from './Interview';
import { withTranslation } from 'react-i18next';

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