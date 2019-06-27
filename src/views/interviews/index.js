
import React, { Component } from 'react';
import Table from '../utilities/Table'
const PATH_BASE = 'http://localhost:3000/interviews';

const url = `${PATH_BASE}`;
console.log(url);
class  Interviews extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: null,
            };

        this.setInterviews = this.setInterviews.bind(this);    
    }
    
    setInterviews(result){
        this.setState({result});
    }

    componentDidMount(){
        fetch(`${PATH_BASE}`)
        .then(response => response.json())
        .then(result => this.setInterviews(result))
        .catch(error => error);
    }

    render(){
        const { result } = this.state;

        if(!result){ return null;}

        //console.log(this.state);
        return <div>
                    <h2>Interviews</h2>
                    <div className="page">
                    <Table
                    list={result[1]}
                    />
                    </div>
                    <div className="container">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li class="page-item disabled">
                            <a className="page-link" href="#" tabindex="-1">Previous</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>

                    </div>
                </div>;
        
    }
    
  }

 export default Interviews; 