import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

export default class Dimentions extends Component {
  render(){
    const {list} = this.props;
    console.log("Dimentions");
    console.log(list);
    return (
      <div className="table">
      {list.map( item =>
        console.log(item)
      )}
      </div>
    );
  }
}