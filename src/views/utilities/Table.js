import React, { Component } from 'react';
import Button from './Button';
import Dimentions from '../interviews/Dimentions';
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
    let newList = list.map( item =>
        {
            //console.log("item:");
            //console.log(item);
        let dimentions = [];
        let keys = Object.keys(item.dimentions);
        //console.log("keys:" + keys);
        keys.forEach(
            (k) =>
            {
            //console.log("key: "+ k);
            dimentions.push(
                {"id": k, "count": contarPreguntas(item.dimentions[k])}
                
            );
            //console.log("Item:");
            //console.log(item);
        });
        item.dimensiones = dimentions;    
        }
      );

    console.log(list);
    return (
        <div className="container">
        <div className="row">
      {list.map( item =>
        <div key={item.id} className="card col-sm-5">
            <div className="card-header">
            <h5 className="card-title">{item.name}</h5>
            </div>
            <div className="card-body">
            <span> Compañia: {item.company}</span>
            <p>Entrevistador</p>
            <span>{item.user.name +' '+ item.user.last_name}</span><br></br>
            <span>{item.user.email}</span>
            <div>
                <p>Dimensiones</p>
                {
                  item.dimensiones.map(
                    (d) => 
                      <div>
                    <span>Dimension {d.id}. Preguntas: {d.count}</span>
                    <br></br>
                    </div>
                    
                  )
                }
            </div>
            <a href="#" className="">Editar</a>
            <a href="#" className="btn btn-primary">Rellenar</a>
            </div>
        </div>
        
      )}
      </div>
      </div>
    );
  }
}