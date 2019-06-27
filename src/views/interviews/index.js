
import React, { Component } from 'react';
import Table from '../utilities/Table';
import ReactPaginate from 'react-paginate';
const PATH_BASE = 'http://localhost:3000/interviews';

const url = `${PATH_BASE}`;
console.log(url);
class  Interviews extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: null,
            currentPage: 1,
            };

        this.setInterviews = this.setInterviews.bind(this);    
    }
    
    setInterviews(result){
        this.setState({result});
    }

    loadInterviewsFromServer(){
        let queryURL = `${PATH_BASE}?page=${this.state.currentPage}`;
        console.log("Query URL:" + queryURL);
        fetch(queryURL)
        .then(response => response.json())
        .then(result => this.setInterviews(result))
        .catch(error => error);
    }

    componentDidMount(){
        this.loadInterviewsFromServer();
    }

    handlePageClick = data => {
        let selected = data.selected + 1;
        console.log("selected:" + selected);
    
        this.setState({ currentPage: selected }, () => {
          this.loadInterviewsFromServer();
        });
      };

    render(){
        const { result } = this.state;

        if(!result){ return null;}

        //console.log(this.state);
        return <div>
                    <h2 class="mb-3 mt-2">Entrevistas</h2>
                    <form class="container">
                    <fieldset>
                    <legend class="text-left">Buscar entrevista:</legend>
                    <div class="row align-items-center">
                        <div class="col-auto">
                        <label for="name" class=" col-form-label col-form-label-sm mr-2">Entrevista: </label>
                        <input type="text" id="name" class="form-control-sm"></input>
                        </div>
                        <div class="col-auto">
                        <label for="company" class=" col-form-label col-form-label-sm mr-2">Compañia:</label>
                        <input type="text" id="company" class="form-control-sm"></input>
                        </div>
                        <div class="col-auto">
                        <label for="interviewer" class=" col-form-label col-form-label-sm mr-2">Entrevistador</label>
                        <input type="text" id="interviewer" class="form-control-sm"></input>
                        </div>
                        
                    </div>
                    </fieldset>
                    <div class="row align-items-center mt-2">
                        <div class="col-auto">
                        <label for="sort" class=" col-form-label col-form-label-sm mr-2">Ordenar por: </label>
                        <select class="form-control-sm" id="sort">
                        <option>Fecha de creación</option>
                        <option>Nombre de entrevista</option>
                        </select>
                        </div>
                        <div class="col-auto">
                        <label for="direction" class=" col-form-label col-form-label-sm mr-2">Dirección:</label>
                        <select class="form-control-sm" id="sort">
                        <option>Ascendente</option>
                        <option>Descendente</option>
                        </select>
                        </div>
                        
                        
                    </div>
                    </form>
                    <div className="page">
                    <Table
                    list={result[1]}
                    />
                    <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.state.result[0]["pages"]}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                    />
                    </div>
                </div>;
        
    }
    
  }

 export default Interviews; 