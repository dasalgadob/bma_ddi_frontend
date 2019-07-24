import React, {Component} from 'react';
import Rating from '@prontopro/react-rating';
import NavDimensions from './NavDimensions';
import AnswersDimensions from './AnswersDimensions';
import MenuCandidate from './../candidates/MenuCandidate';
import NavigationButtons from './NavigationButtons';
const axios = require('axios');


const POST_URL = `${process.env.REACT_APP_BACKEND_URL}/candidates`;
const POST_URL_RESULT = `${process.env.REACT_APP_BACKEND_URL}/results`;
const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/interviews`;


export default class FillInterview extends Component{

    constructor(props){
        super(props);

        this.state= {
            id: null,
            fields: {
                idCandidate: null,
                name: '',
                email: '',
                idResult: null,
                position: '',
                company: ''
            },
            idInterview: props.match.params.id,
            interviewData: null,
            styleMenuCandidates: {display: 'block'},
            styleMenuInterview: {display: 'none'},
            isFillDimensionsTab: true,
            isMotivationalCompetenceTab: false,
            isCompensationTab: false,
            /**Style for filling questions */
            styleFillDimensions: {display: 'block'}, 
            styleMotivationalCompetence: {display: 'none'},
            styleCompensation: {display: 'none'},
            currentDimension: null

        };
    }

    componentDidMount() {
        console.log("idInter:" + this.state.idInterview);
        this.loadInterviewFromServer();
    }

    loadInterviewFromServer = () => {
        let self = this;
        axios.get(`${PATH_BASE}/${this.state.idInterview}`)
        .then(function (response) {
            // handle success
            console.log('loadInterviewFromServer:');
            console.log(response.data);
            const dataAnswer = response.data.data;
            let currentDimension = null;
            if(dataAnswer.attributes.dimensions.length > 0){
                currentDimension = dataAnswer.attributes.dimensions[0].id;
            }
            
            self.setState({
                interviewData: response.data,
                currentDimension
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });   
    }

    onSaveCandidate = (e) => {
        console.log("candidate saving");
        const {name, email} = this.state.fields;
        const fields = this.state.fields;
        e.preventDefault();
        console.log("Do notgnb");
        const headers = JSON.parse(localStorage.getItem('user'));
        let self = this;
        axios({
            method: 'post',
            url: `${POST_URL}`,
            data: 
            {candidate: {name: name, email: email}},
            headers: headers
            })
        .then(function (response) {
            // handle success
            console.log("success candidate saving");
            console.log(response.data);
            fields['idCandidate'] = response.data.id
            self.setState({ fields}, self.chooseIfcreateOrUpdateResult);
            //self.chooseIfcreateOrUpdateResult();
            self.changeMenu();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    onChooseCandidate = (e) => {
        const fields = this.state.fields;
        console.log('on choose candidate');
        fields['idCandidate'] = parseInt(e.target.id);
        this.setState({fields}, ()  => {this.chooseIfcreateOrUpdateResult()});
        //this.chooseIfcreateOrUpdateResult();
        this.changeMenu();
        console.log('e.target.value');
        console.log(e.target.id);
    }

    onInputChange = (e) => {
        const fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({fields});
        console.log(fields);
    }

    changeMenu = () => {
        console.log('change menu');
        this.setState({
            styleMenuCandidates: {display: "none"},
            styleMenuInterview: {display: "block"}
        });
    }

    changeMenuToCandidates = () => {
        console.log('changeMenuToCandidates');
        this.setState({
            styleMenuCandidates: {display: "block"},
            styleMenuInterview: {display: "none"}
        });
    }

    onChangeIsFillDimensionsTab = (e) => {
        this.setState({
            isFillDimensionsTab: true,
            isMotivationalCompetenceTab: false,
            isCompensationTab: false,
            styleFillDimensions: {display: 'block'},
            styleMotivationalCompetence: {display: 'none'},
            styleCompensation: {display: 'none'}
        });
    }

    onChangeIsMotivationalCompetenceTab = (e) => {
        this.setState({
            isFillDimensionsTab: false,
            isMotivationalCompetenceTab: true,
            isCompensationTab: false,
            styleFillDimensions: {display: 'none'},
            styleMotivationalCompetence: {display: 'block'},
            styleCompensation: {display: 'none'}
        });
    }

    onChangeIsCompensationTab = (e) => {
        this.setState({
            isFillDimensionsTab: false,
            isMotivationalCompetenceTab: false,
            isCompensationTab: true,
            styleFillDimensions: {display: 'none'},
            styleMotivationalCompetence: {display: 'none'},
            styleCompensation: {display: 'block'}
        });
    }

    onChangeNavDimensionsTab = (e) => {
        console.log("id dim: " + e.target.id);
        //this.setState({currentDimension: this.state.interviewData.data e.target.id});
    }

    chooseIfcreateOrUpdateResult = () => {
        if(!this.state.fields.idResult){
            console.log("createResult");
            this.createResult();
        }else{
            console.log("updateResult");
            this.updateResult();
        }
    }

    /**
     * Make a post request with the info of id_user based on the one selected or just created
     */
    createResult = () => {
        console.log("createResult");
        const {idCandidate} = this.state.fields;
        const fields = this.state.fields;
        const headers = JSON.parse(localStorage.getItem('user'));
        let self = this;
        const resultJSON = {
            result: {candidate_id: idCandidate}
        };
        console.log(resultJSON);
        axios({
            method: 'post',
            url: `${POST_URL_RESULT}`,
            data: 
            {result: {candidate_id: idCandidate}},
            headers: headers
            })
        .then(function (response) {
            // handle success
            console.log("success createResult");
            console.log(response.data);
            fields['idResult'] = response.data.id;
            self.setState({fields});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    updateResult = () => {
        console.log("updateResult");
        const {idCandidate} = this.state.fields;
        const fields = this.state.fields;
        const headers = JSON.parse(localStorage.getItem('user'));
        let self = this;
        axios({
            method: 'patch',
            url: `${POST_URL_RESULT}/${self.state.fields.idResult}`,
            data: 
            {result: {candidate_id: idCandidate}},
            headers: headers
            })
        .then(function (response) {
            // handle success
            console.log("success updateResult");
            console.log(response.data);
            fields['idResult'] = response.data.id;
            self.setState({fields});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    validatesDimensionQuestions = () => {
        console.log("To be implemented");
    }

    render(){
        console.log(this.state);
        const {styleMenuCandidates, styleMenuInterview, interviewData, currentDimension} = this.state;

        if(!interviewData){
            return <div></div>
        }

        return(<div >
            <MenuCandidate onInputChange={this.onInputChange} 
                           onSaveCandidate={this.onSaveCandidate}
                           onChooseCandidate={this.onChooseCandidate}
                           style={styleMenuCandidates}>
            </MenuCandidate>
            


        <div style={styleMenuInterview}>
            <h3>Rellenar entrevista</h3>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    
                    <a className={`nav-link ${this.state.isFillDimensionsTab? "active": ''}` }
                        onClick={this.onChangeIsFillDimensionsTab} 
                        href="#"><h3>1</h3>Rellenar las preguntas de las dimensiones</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${this.state.isMotivationalCompetenceTab? "active": ''}` }
                        onClick={this.onChangeIsMotivationalCompetenceTab}  
                        href="#"><h3>2</h3>Competencia motivacional</a>
                </li>

                <li className="nav-item">
                    <a className={`nav-link ${this.state.isCompensationTab? "active": ''}` }
                        onClick={this.onChangeIsCompensationTab}  
                        href="#"><h3>3</h3>Compensación actual y movilidad
                        </a>
                </li>
            </ul>

            {/** Content for fill dimensions */}
            <div className="mt-2"  style={this.state.styleFillDimensions}>
                <NavigationButtons handleBeforeButton={this.changeMenuToCandidates}
                                   handleNextButton={this.validatesDimensionQuestions}>

                </NavigationButtons>
                <NavDimensions dimensions={this.state.interviewData.data.attributes['dimensions']} 
                onClick={this.onChangeNavDimensionsTab}>

                </NavDimensions>

                <AnswersDimensions questions={this.state.interviewData.included}
                                   dimensionId={currentDimension}
                                   dimension={2}>
                </AnswersDimensions>
            </div>

            {/** Content for motivational questions */}
            <div className="container mx-3" style={this.state.styleMotivationalCompetence}>
            <h4 className="mt-4">Compatibilidad motivacional</h4>
            <p>La medida en que las actividades y responsabilidades del puesto, la modalidad de operación y los valores de la organización, y la comunidad en la cual el individuo vivirá, se corresponden con el tipo de ambiente que brinda satisfacción personal; el grado en el cual el propio trabajo es personalmente satisfactorio.</p>
            
            <br>
            </br>
            <p>Pregunta General: ¿Cuándo estuvo usted más satisfecho/insatisfecho en su trabajo? 
                ¿Qué fue lo más satisfactorio/insatisfactorio de eso?.</p>
            <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Respuesta</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <h1>
            <Rating
            animateOnHover
            disableAnimation
            initialRate={0}
            stop={5}
            /></h1>
            </div>
            

            <p>Pregunta Abierta: Hábleme de una ocasión en la que tuvo varias/pocas oportunidades de _________ 
                en su trabajo. ¿Qué tan satisfecho estuvo usted con eso y por qué?.</p>
            <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Respuesta</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <Rating
            animateOnHover
            disableAnimation
            initialRate={0}
            stop={5}
            />
            </div>      

            </div>

            {/** Content for compensation and mobility */}

            <div className="container-fluid mx-4" style={this.state.styleCompensation}>
            <h4 className="mt-4">Compensacion actual y movilidad</h4>
            <p>Averigua cual es la situación del candidato y donde quiere llegar.</p>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
                <label htmlFor="exampleInputPassword1" className="align-left ">Compañía para la que entrevista</label>
                <input type="text"
                        name="name"
                        className="form-control " 
                        id="exampleInputPassword1" 
                        required="required"
                        onChange={this.props.onInputChange}/>
            </div>

            <div className="form-group row">
                <label htmlFor="exampleInputPassword1" className="align-left">Puesto para el que entrevista</label>
                <input type="text"
                        name="name"
                        className="form-control" 
                        id="exampleInputPassword1" 
                        required="required"
                        onChange={this.props.onInputChange}/>
            </div>

            <div className="form-group row">
                <label htmlFor="exampleInputPassword1" className="align-left">Salario base</label>
                <input type="text"
                        name="name"
                        className="form-control" 
                        id="exampleInputPassword1" 
                        required="required"
                        onChange={this.props.onInputChange}/>
            </div>

            <div className="form-group row">
                <label htmlFor="exampleInputPassword1" className="align-left">Beneficios</label>
                <input type="text"
                        name="name"
                        className="form-control" 
                        id="exampleInputPassword1" 
                        required="required"
                        onChange={this.props.onInputChange}/>
            </div>

            <div className="form-group row">
                <label htmlFor="exampleInputPassword1" className="align-left">Expectativas de salario</label>
                <input type="text"
                        name="name"
                        className="form-control" 
                        id="exampleInputPassword1" 
                        required="required"
                        onChange={this.props.onInputChange}/>
            </div>

            <div className="form-group row">
                <label htmlFor="exampleInputPassword1" className="align-left">Áreas geográficas</label>
                <input type="text"
                        name="name"
                        className="form-control" 
                        id="exampleInputPassword1" 
                        required="required"
                        onChange={this.props.onInputChange}/>
            </div>
              
            </form>
            </div>
        </div>
        </div>
        );
    }
}
