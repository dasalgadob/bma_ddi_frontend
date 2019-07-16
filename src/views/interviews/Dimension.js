import React,{ Component} from "react";

export default class Dimension extends Component{


    render(){
        const style = {fontSize: '15px'};
        console.log('this.props');
        console.log(this.props);
        return (
            <div class="container">
                <h3 className="text-left">{this.props.name.spanish}</h3>
                <p className="text-left">{this.props.description.spanish}</p>
                <div >
                    <div className="card text-left" style={style}>
                        <table className="table table-striped">
                            <tbody className="">
                    {this.props.questions.map(
                        (q) => 
                            <tr >
                                <td className="">
                            <div className="custom-control custom-checkbox">
                                <input id={q.id} key={q.id} className="custom-control-input" type="checkbox" value="true" >
                                    </input>
                                <label className="custom-control-label" for={q.id}>
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