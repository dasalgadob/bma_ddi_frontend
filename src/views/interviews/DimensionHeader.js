import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
const axios = require('axios');

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/dimensions`;

class DimensionHeader extends Component{

    constructor(props){
        super(props);

        this.state = {
            dimensionId: props.dimensionId,
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
        const {t, i18n} = this.props;
        const language = i18n.language == "es"? "spanish":"english";

        const {dimension, dimensionId} = this.state;
        if(!this.state.dimension){
            return <div></div>
        }
        if(this.props.dimensionId != dimension.data.id){
            console.log("diff");
            this.loadDimensionFromServer();
        }
        console.log("Dimension id DimensionHeader:" + this.props.dimensionId);
        console.log(dimension);
        return(<div className="mt-4">
            <h4>{dimension.data.attributes.name[language]}</h4>
            <p>{dimension.data.attributes.description[language]}</p>
        </div>);
    }
}

export default withTranslation()(DimensionHeader);