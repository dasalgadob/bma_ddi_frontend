import React,{ Component} from "react";

export default class Dimension extends Component{


    render(){
        const style = {fontSize: '14px'};
        console.log('this.props');
        console.log(this.props);
        return (
            <div class="container mt-1">
                <h3 className="text-left">{this.props.name.spanish}</h3>
                <p className="text-left">{this.props.description.spanish}</p>
                <div >
                    <div class="row card " style={style}>
                        <tbody>
                    {this.props.questions.map(
                        (q) => 
                            <tr>
                            <div class="form-check ml-5 mr-5">
                                <td>
                            <input key={q.id} class="mr-2 " type="checkbox" value="" id={q.id} />
                            </td>
                            <td>
                            <label class="" for="defaultCheck1">
                                {q.attributes.translation.spanish}
                            </label>
                            </td>
                            </div>
                            </tr>
                        
                    )}
                    </tbody>
                    </div>
                </div>
            </div>
        );
    }
}