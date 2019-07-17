import React,{ Component} from "react";

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
                        (q) => 
                            <tr key={"tr-" + q.id}>
                                <td className="">
                            <div className="custom-control custom-checkbox">
                                <input id={q.id} key={q.id} className="custom-control-input" type="checkbox" value="true"
                                       onClick={this.onQuestionSelected}
                                       name={q.id} >
                                    </input>
                                <label className="custom-control-label" htmlFor={q.id}>
                                    {q.attributes.translation.spanish}
                                </label>
                            </div>
                            </td>
                            </tr>
                    )}
                    </tbody>
                    </table>
                    </div>
                </div>
            </div>
        );
    }
}