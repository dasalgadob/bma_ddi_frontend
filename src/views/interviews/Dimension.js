import React,{ Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faAngleDown, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { withTranslation } from 'react-i18next';


class Dimension extends Component{

    constructor(props){
        super(props);
        this.state = {
            displayQuestions: true
        };
        this.onQuestionSelected = this.onQuestionSelected.bind(this);
    }

    showProperLabel = (attributes) =>{
        const { t, i18n } = this.props;
        const language = i18n.language == "es"? "spanish":"english";
        if(attributes.name){
           return (<div><h4>{attributes.name[language]}</h4>
           <p>{attributes.description[language]}</p>
           </div>); 
        }else{
            return(<p>{attributes.translation[language]}</p>);
        }
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
        const style = {fontSize: '14px'};
        const {displayQuestions} = this.state;
        const { t, i18n } = this.props;
        const language = i18n.language == "es"? "spanish":"english";
        console.log('this.props.DImension');
        console.log(i18n);
        return (
            <div className="">
                <div className="row">
                    <div className="col-sm-10">
                    <h3 className="text-left ml-5">{this.props.name[language]}</h3>
                    <p className="text-left ml-5 ">{this.props.description[language]}</p>
                    </div>
                    
                    {this.renderBasedOnDimension()}
                        
                    
                </div>
                <div style={{display: displayQuestions?"block":"none"}}>
                    <div className="card" style={style}>
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
                                    {this.showProperLabel(q.attributes)}
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

export default withTranslation()(Dimension);