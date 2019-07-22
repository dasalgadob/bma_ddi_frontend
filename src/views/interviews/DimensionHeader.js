import React, {Component} from 'react';
const axios = require('axios');

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/dimensions`;

export default class DimensionHeader extends Component{

    constructor(props){
        super(props);

        this.state = {
            dimension: null
        }

    }

    componentDidMount(){
        this.loadDimensionFromServer();
    }

    loadDimensionFromServer = () => {
        let self = this;
        axios.get(`${PATH_BASE}/${this.props.dimensionId}`)
        .then(function (response) {
            // handle success
            console.log('loadDimensionFromServer:');
            console.log(response.data);
            self.setState({
                dimension: response.data
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


    render(){
        const {dimension} = this.state;
        if(!this.state.dimension){
            return <div></div>
        }
        return(<div className="mt-4">
            <h4>{dimension.data.attributes.name.spanish}</h4>
            <p>{dimension.data.attributes.description.spanish}</p>
        </div>);
    }
}