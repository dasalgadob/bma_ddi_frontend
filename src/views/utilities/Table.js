import React, { Component } from 'react';
import Button from './Button';
import Dimentions from '../interviews/Dimentions';
import {  Link } from "react-router-dom";

function isSearched(searchTerm){
  return function(item){
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

function contarPreguntas(object){
    //console.log("object");
    //console.log(object);
    let q  = object['questions'];
    let keys = Object.keys(q);
    let count=0;
    keys.forEach(
        (k) => {
            //console.log('q[k]');
            //console.log(q[k]);
        if(q[k]== true){
            count++;
        }
    }
    );
    return count;
}

export default class Table extends Component {
  render(){
    const {list} = this.props;
    let result = [];
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("user");
    console.log(user);
    console.log(list);
    return (
        <div className="container-fluid m-5">
        <div className="row">
      {list.map( item => 
        <div key={item.id} className="card col-sm-5">
            <div className="card-header">
            <h6 className="card-title font-weight-bold">{item.name}
            </h6>
            <p className="badge badge-secondary ">{item.user.email== user.uid?"En propiedad": ""}</p>
            </div>
            <div className="card-body">
            <p><span className="font-weight-bold"> Compañia: &nbsp;</span>{item.company}</p>
            <p ><span className="font-weight-bold">Entrevistador: &nbsp;</span> 
             <span>{item.user.name +' '+ item.user.last_name}</span> &nbsp; <span>{item.user.email}</span></p>
            
            <div>
              
              <p className="font-weight-bold">Dimensiones</p>
                {
                  item.dimensions.map(
                    (k, v) => 
                      
                    <div className="alert alert-secondary" role="alert">
                    {k.spanish} <span className="font-weight-bold">Preguntas: &nbsp; </span>{k.count}
                    </div>
                  )
                }
            </div>
            <Link to={`interviews/${item.id}`} className="">Editar</Link>
            <Link to={`interviews/${item.id}/fill`} className="btn btn-primary">Rellenar</Link>
            </div>
        </div>
        
      )}
      </div>
      </div>
    );
  }
}