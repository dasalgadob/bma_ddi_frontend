
import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom'; 
import { withTranslation } from 'react-i18next';


const USER_URL = `${process.env.REACT_APP_BACKEND_URL}/auth`;
const USERS_URL = `${process.env.REACT_APP_BACKEND_URL}/users`;

 class NewUser extends Component{

    constructor(props){
        super(props);

        this.state = {
            idUser: props.match.params.id? props.match.params.id:"",
            userData: {},
            fields: {
                name:"",
                lastName:'',
                email:'',
                password:'',
                confirmationPassword:'',
                isAdmin: false,
                isDisabled: false,
                styleDisplayMatch: {
                    display: "none"
                },
                styleDisplayNotMatch: {
                    display: "none"
                },
                redirect: false
            }
        };
    }

    componentDidMount(){
        //
        console.log("this.props.params.id");
        console.log(this.props.match.params.id);
        if(this.state.idUser){
            this.setState({idUser: this.props.match.params.id}, this.loadUserFromServer);
        }
    }

    loadUserFromServer = () => {
        const {fields, userData} = this.state;
        
        const headers = JSON.parse(localStorage.getItem('user'));
        //console.log("idInt:" + idInterview);
        let method = 'get';
        let self = this;
        
        axios({
            method: method,
            url: `${USERS_URL}/${this.props.match.params.id}`,
            headers: headers
            })
        .then(function (response) {
            // handle success
            console.log("loadUserFromServer");
            console.log(response.data);
            let userDataNew = response.data;
            fields.name= response.data.name;
            fields.lastName= response.data.last_name;
            fields.email= response.data.email;
            fields.isAdmin= response.data.admin;
            fields.isDisabled= response.data.is_disabled;

            self.setState({userData: userDataNew, fields});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    onInputChange = (e) => {
        const {fields} = this.state;
        fields[e.target.name] = e.target.value;
        console.log("onInputChange");
        console.log(fields.password);
        console.log(fields.confirmationPassword);
        if(e.target.name =="password" || e.target.name =="confirmationPassword" ){
            //If match display match
            if(fields['password'] == fields['confirmationPassword']){
                
                fields.styleDisplayMatch = {
                    display: "block"
                };
                fields.styleDisplayNotMatch = {
                    display: "none"
                };
            }else{
                fields.styleDisplayMatch = {
                    display: "none"
                };
                fields.styleDisplayNotMatch = {
                    display: "block"
                };
            }
            //Else display not match
        }
        
        this.setState({fields});
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.state.idUser == ""){
            this.createUser();
        }else{
            this.updateUser();
        }
    }

    updateUser = () =>{

        const {fields} = this.state;
        
        const headers = JSON.parse(localStorage.getItem('user'));
        //console.log("idInt:" + idInterview);
        let method = 'patch';
        let self = this;
        
        axios({
            method: method,
            url: `${USERS_URL}/${this.state.idUser}`,
            data: 
             {user: { name: fields.name,
            last_name: fields.lastName,
            email: fields.email,
            password: fields.password,
            password_confirmation: fields.confirmationPassword,
            admin: fields.isAdmin,
            is_disabled: fields.isDisabled
            
            }},
            headers: headers
            })
        .then(function (response) {
            // handle success
            //console.log(response.data);
            self.setRedirect();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    createUser = () =>{

        const {fields} = this.state;
        
        const headers = JSON.parse(localStorage.getItem('user'));
        //console.log("idInt:" + idInterview);
        let method = 'post';
        let self = this;
        
        axios({
            method: method,
            url: `${USER_URL}`,
            data: 
            { name: fields.name,
            last_name: fields.lastName,
            email: fields.email,
            password: fields.password,
            password_confirmation: fields.confirmationPassword,
            admin: fields.isAdmin,
            is_disabled: fields.isDisabled
            
            },
            headers: headers
            })
        .then(function (response) {
            // handle success
            //console.log(response.data);
            self.setRedirect();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

      renderRedirect = () => {
        if (this.state.redirect ) {
            return <Redirect to={'/users/'} />
        }
        } 

    renderIsDisabled = () =>{    
        if(this.state.idUser != "" && this.state.fields.isAdmin){
        return (<div className="form-check">
            <input name='isDisabled' type="checkbox" className="form-check-input" id="exampleCheck2" 
                onChange={this.onInputChange} checked={this.state.fields.isDisabled}/>
            <label className="form-check-label" for="exampleCheck2">Desabilitar usuario</label>
        </div> );   
      }
      }

      renderIsAdmin = () => {
        if(this.state.fields.isAdmin){
            return (<div className="form-check">
            <input name='isAdmin' type="checkbox" className="form-check-input" id="exampleCheck1" 
                  onChange={this.onInputChange} checked={this.state.fields.isAdmin}/>
            <label className="form-check-label" for="exampleCheck1">Es Administrador</label>
          </div>);   
          }
      }

    render(){
        const {fields} = this.state; 
        const styleDisplay = {
            display: "none"
        };

        const {t, i18n} = this.props;

        return(
        <div>
            {this.renderRedirect()}
            <form onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label for="exampleInputName">{t('user.name')}</label>
              <input name='name' type="text" className="form-control" 
                    id="exampleInputName" aria-describedby="emailHelp" 
                    placeholder={t('user.name_placeholder')} required
                    onChange={this.onInputChange}
                    value={fields.name}/>
            </div>
            <div className="form-group">
              <label for="exampleInputName">{t('user.last_name')}</label>
              <input name='lastName' type="text" className="form-control" id="exampleInputName" 
                    aria-describedby="emailHelp" placeholder={t('user.last_name_placeholder')}
                    onChange={this.onInputChange}
                    value={fields.lastName}/>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">{t('user.email')}</label>
              <input name='email' type="email" className="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" placeholder={t('user.email_placeholder')} required 
                    onChange={this.onInputChange}
                    value={fields.email}
                    readOnly={this.state.idUser?true:false}/>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">{t('user.password')}</label>
              <input name='password' type="password" className="form-control" id="exampleInputPassword1" 
                    placeholder={t('user.password')} required={this.state.idUser?false:true} minlength="6"
                    onChange={this.onInputChange}/>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">{t('user.password_confirmation')}</label>
              <input name='confirmationPassword' type="password" className="form-control" 
                    id="exampleInputPassword1" 
                    placeholder={t('user.password')} required={this.state.idUser?false:true} minlength="6"
                    onChange={this.onInputChange}/>
            </div>

            <p style={fields.styleDisplayMatch}  className="text-success">{t('user.password_match')}</p>
            <p style={fields.styleDisplayNotMatch} className="text-danger">{t('user.password_dont_match')}</p>
            {this.renderIsDisabled()}            
            {this.renderIsAdmin()}
            
            <button type="submit" className="btn btn-primary mt-4" >{t('user.save')}</button>
          </form>
          </div>
        );
    }
}

export default withTranslation()(NewUser);