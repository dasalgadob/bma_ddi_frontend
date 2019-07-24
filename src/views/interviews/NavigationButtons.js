import React, {Component} from 'react';


/**Contains next and before buttons */
export default class NavigationButtons extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(<form className="container">
        <div className=" ">
            <div className="d-flex flex-row mt-3">
                <button type="button" 
                        className="btn btn-primary  mx-2 mr-auto"
                        onClick={this.props.handleBeforeButton}>Atras</button>
                <div className="btn-toolbar">
                <button onClick={this.props.handleNextButton} className="btn btn-primary  ml-auto mx-1">Siguiente</button>
                </div>
            </div>
        </div>
    </form>);
    }
}