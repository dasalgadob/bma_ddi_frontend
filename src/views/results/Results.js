import React, { Component } from 'react';
import ResultsTable from './ResultsTable';

import ReactPaginate from 'react-paginate';

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/results`;


class Results extends Component {
    constructor(props){
        super(props);
        this.state = {
            resultsDataAll: null,
            resultsDataPaging: null,
            resultsData: null,
            currentPage: 1,
            positionTerm: "",
            companyTerm: "",
            interviewerTerm: "",
            candidateTerm: '',
            sortByField: '',
            sortOrder: '',
        };
        console.log("contructor");
        this.setResults = this.setResults.bind(this);
        this.onPositionChange = this.onPositionChange.bind(this);
        this.onCompanyChange = this.onCompanyChange.bind(this);
        this.onInterviewerChange = this.onInterviewerChange.bind(this);
        this.onCandidateChange = this.onCandidateChange.bind(this);
    }

    componentDidMount(){
        this.loadResultsFromServer();
    }

    loadResultsFromServer(){
        let queryURL = `${PATH_BASE}?page=${this.state.currentPage}` +
        `&by_position=${this.state.positionTerm}&by_company=${this.state.companyTerm}` +
        `&by_interviewer=${this.state.interviewerTerm}&by_candidate=${this.state.candidateTerm}`+
        `&sort=${this.state.sortByField}`+
        `&direction=${this.state.sortOrder}`;
        console.log("Query URL:" + queryURL);
        fetch(queryURL)
        .then(response => response.json())
        .then(result => this.setResults(result))
        .catch(error => error);
    }

    setResults(data){
        console.log("resultsData");
        console.log(data[1]);
        this.setState({resultsDataAll: data, resultsData: data[1], resultsDataPaging: data[0]});
    }

    onPositionChange(e){
        const positionTerm = e.target.value;
        //console.log("InterviewTErm: " + interviewTerm);
        this.setState({positionTerm: positionTerm}, () => {
            this.loadResultsFromServer();
          });
    }

    onCompanyChange(e){
        const companyTerm = e.target.value;
        //console.log("InterviewTErm: " + interviewTerm);
        this.setState({companyTerm: companyTerm}, () => {
            this.loadResultsFromServer();
          });
    }

    onInterviewerChange(e){
        const interviewerTerm = e.target.value;
        //console.log("InterviewTErm: " + interviewTerm);
        this.setState({interviewerTerm: interviewerTerm}, () => {
            this.loadResultsFromServer();
          });
    }

    onCandidateChange(e){
        const candidateTerm = e.target.value;
        //console.log("InterviewTErm: " + interviewTerm);
        this.setState({candidateTerm: candidateTerm}, () => {
            this.loadResultsFromServer();
          });
    }

    handlePageClick = data => {
        let selected = data.selected + 1;
        console.log("selected:" + selected);
    
        this.setState({ currentPage: selected }, () => {
          this.loadResultsFromServer();
        });
      };

      onSortByChange = (e) => {
        const sortByTerm = e.target.value.split(';');
        const sortByField =  sortByTerm[0];
        const sortOrder = sortByTerm[1];
        console.log("sortByField: " + sortByField);
        console.log("sortOrder: " + sortOrder);
        this.setState({sortByField: sortByField,  sortOrder: sortOrder}, () => {
            this.loadResultsFromServer();
          });
    }


    render(){

        if(!this.state.resultsData){ return null;}

        let pageComponent = <ReactPaginate
        previousLabel={'anterior'}
        nextLabel={'siguiente'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={this.state.resultsDataPaging["pages"]}
        forcePage={this.state.currentPage-1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
        />;

        //const { resultsDataAll } = this.state;
        return <div>
            <h2>Resultados</h2>
            <form className="container mb-2">
                    <fieldset>
                    <legend className="text-left">Buscar resultado:</legend>
                    <div className="row align-items-center">
                        <div className="col-auto">
                        <label htmlFor="name" className=" col-form-label col-form-label-sm mr-2">Posición: </label>
                        <input type="text" id="name" className="form-control-sm" onChange={this.onPositionChange}></input>
                        </div>
                        <div className="col-auto">
                        <label htmlFor="company" className=" col-form-label col-form-label-sm mr-2">Compañia:</label>
                        <input type="text" id="company" className="form-control-sm" onChange={this.onCompanyChange}></input>
                        </div>
                        <div className="col-auto">
                        <label htmlFor="candidate" className=" col-form-label col-form-label-sm mr-2">Candidato:</label>
                        <input type="text" id="candidate" className="form-control-sm" onChange={this.onCandidateChange}></input>
                        </div>

                        <div className="col-auto">
                        <label htmlFor="interviewer" className=" col-form-label col-form-label-sm mr-2">Entrevistador: </label>
                        <input type="text" id="interviewer" className="form-control-sm" onChange={this.onInterviewerChange}></input>
                        </div>
                        
                    </div>
                    </fieldset>
                    <div className="row align-items-center mt-2">
                        <div className="col-auto">
                        <label htmlFor="sort" className=" col-form-label col-form-label-sm mr-2">Ordenar por: </label>
                        <select className="form-control-sm" id="sort" onChange={this.onSortByChange}>
                        <option value="created_at;desc">Fecha de creación más reciente</option>
                        <option value="created_at;asc">Fecha de creación más antiguo</option>
                        <option value="position;asc">Posición A-Z</option>
                        <option value="position;desc">Posición Z-A</option>
                        </select>
                        </div>
                        
                        
                    </div>
                    </form>


            {pageComponent}
            <ResultsTable data={this.state.resultsData}></ResultsTable>

            {pageComponent}
        </div>;
    }
}

export default Results;