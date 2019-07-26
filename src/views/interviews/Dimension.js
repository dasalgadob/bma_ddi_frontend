import React,{ Component} from "react";


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
        this.onQuestionSelected = this.onQuestionSelected.bind(this);
    }

    onQuestionSelected(e){
        this.props.onClick(e);
    }

    render(){
        const style = {fontSize: '15px'};
        console.log('this.props');
        console.log(this.props);
        return (
            <div className="mt-4">
                <h3 className="text-left ml-5">{this.props.name.spanish}</h3>
                <p className="text-left ml-5">{this.props.description.spanish}</p>
                <div >
                    <div className="card text-left mx-4" style={style}>
                        <table className="table table-striped">
                            <tbody className="">
                    {this.props.questions.map(
                        (q) => { if(q.attributes.mandatory){
                            return (<tr></tr>);
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