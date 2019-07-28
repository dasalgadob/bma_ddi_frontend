import React,{ Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faAngleDown, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

function showProperLabel(attributes){
    if(attributes.name){
       return (<div><h4>{attributes.name.spanish}</h4>
       <p>{attributes.description.spanish}</p>
       </div>); 
    }else{
        return(<p>{attributes.translation.spanish}</p>);
    }
}

export default class Dimension extends Component{

    constructor(props){
        super(props);
        this.state = {
            displayQuestions: true
        };
        this.onQuestionSelected = this.onQuestionSelected.bind(this);
    }

    onQuestionSelected(e){
        this.props.onClick(e);
    }

    onClickToggleDimension = e => {
        this.setState({
            displayQuestions: !this.state.displayQuestions
        });
    }

    onDelete = () => {
        console.log("onDelete");
        let ids=[];
        this.props.questions.forEach(q =>{
            console.log("q: " + this.props.questionsSelected[q.id]);
            if(this.props.questionsSelected[q.id]){
                ids.push(q.id);
            }
        });
        this.props.onUpdateArrayQuestionsSelected(ids, false);
        this.props.onDeleteDimension();
    }

    renderBasedOnDimension = () => {
        const {displayQuestions} = this.state;
        if(this.props.id != 43){
            return(
            <div className="col-sm-2">
                <a   role="button" href="#"  id={this.props.id} className="col-sm-1 btn btn-link"  
                         onClick={this.onDelete} className="">
                    <FontAwesomeIcon icon={faTrash}/>
                </a>
                <a className="col-sm-1" role="button" href="#"  onClick={this.onClickToggleDimension} className="">
                    <FontAwesomeIcon icon={displayQuestions?faAngleDown:faAngleLeft}/>
                </a>
            </div>);
        }
    }

    render(){
        const style = {fontSize: '15px'};
        const {displayQuestions} = this.state;
        
        //console.log('this.props');
        //console.log(this.props);
        return (
            <div className="mt-4">
                <div className="row">
                    <div className="col-sm-10">
                    <h3 className="text-left ml-5">{this.props.name.spanish}</h3>
                    <p className="text-left ml-5 ">{this.props.description.spanish}</p>
                    </div>
                    
                    {this.renderBasedOnDimension()}
                        
                    
                </div>
                <div style={{display: displayQuestions?"block":"none"}}>
                    <div className="card text-left mx-4" style={style}>
                        <table className="table table-striped">
                            <tbody className="">
                    {this.props.questions.map(
                        (q) => { if(q.attributes.mandatory){
                            return null;
                        }
                        return(
                            <tr key={"tr-" + q.id}>
                                <td className="">
                            <div className="custom-control custom-checkbox">
                                <input id={q.id} key={q.id} className="custom-control-input" type="checkbox" value="true"
                                       onClick={this.onQuestionSelected}
                                       name={q.id} 
                                       checked={this.props.questionsSelected[q.id]? "checked":""}>
                                    </input>
                                <label className="custom-control-label" htmlFor={q.id}>
                                    {showProperLabel(q.attributes)}
                                </label>
                            </div>
                            </td>
                            </tr>)
                        }
                    )}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}