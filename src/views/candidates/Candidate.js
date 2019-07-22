import React, {Component} from 'react';

export default class Candidate extends Component{

    constructor(props){
        super(props);
    }

    handleSubmit = (e) => {
        this.props.onSubmit(e);
    }

    render(){
        return(<div className="">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
                    <label htmlFor="exampleInputPassword1" className="align-left">Nombre</label>
                    <input type="text"
                           name="name"
                           className="form-control" 
                           id="exampleInputPassword1" 
                           placeholder="Nombre"
                           required="required"
                           onChange={this.props.onInputChange}/>
                </div>
                <div className="form-group row">
                    <label htmlFor="exampleInputEmail1" className="align-left">Email</label>
                    <input type="email" 
                           name="email"
                           className="form-control" 
                           id="exampleInputEmail1" 
                           aria-describedby="emailHelp" 
                           placeholder="Enter email"
                           required="required"
                           onChange={this.props.onInputChange} />
                </div>
                
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>);
    }
}