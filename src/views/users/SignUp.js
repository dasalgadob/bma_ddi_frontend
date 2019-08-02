
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

export default class Signup extends Component{
    render(){
        return(
            
<div className="container register-form">
            <div className="form">
            <h1 className="h3 mb-3 font-weight-normal">Registrarse</h1>
                <div className="form-content">
                    <div className="row">
                        <div className="col-md-6">
                        <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email *" value=""></input>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="First Name *" value=""></input>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Last Name " value=""></input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Your Password *" value=""></input>
                            </div>
                            <div clasNames="form-group">
                                <input type="text" className="form-control" placeholder="Confirm Password *" value=""></input>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btnSubmit btn btn-success">Submit</button>
                </div>
            </div>
        </div>

        );
    }
}

