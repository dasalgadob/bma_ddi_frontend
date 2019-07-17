import React, {Component} from 'react';


export default class Candidate extends Component{

    constructor(props){
        super(props);

    }

    render(){
        return(<div class="">
            <form>
            <div className="form-group row">
                    <label for="exampleInputPassword1" className="align-left">Nombre</label>
                    <input type="text"
                           className="form-control" 
                           id="exampleInputPassword1" 
                           placeholder="Nombre"
                           required="required"/>
                </div>
                <div className="form-group row">
                    <label for="exampleInputEmail1" className="align-left">Email</label>
                    <input type="email" 
                           className="form-control" 
                           id="exampleInputEmail1" 
                           aria-describedby="emailHelp" 
                           placeholder="Enter email"
                           required="required" />
                </div>
                
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>);
    }
}