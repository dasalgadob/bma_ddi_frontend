import React, { Component } from 'react';
import ResultsTable from './ResultsTable';
import { withTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import ModalGenericDelete from './../utilities/ModalGenericDelete';

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/results`;
const USERS_URL = `${process.env.REACT_APP_BACKEND_URL}/users`;

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
            searchTerm: '',
            sortByField: '',
            sortOrder: '',
            currentUserAdmin: false,
            modalDelete: false,
            idResultDelete: null,
            positionResultDelete: ""
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
        this.loadCurrentUserFromServer();
    }

    loadResultsFromServer(){
        let queryURL = `${PATH_BASE}.json?page=${this.state.currentPage}` +
        `&by_position=${this.state.positionTerm}&by_company=${this.state.companyTerm}` +
        `&by_interviewer=${this.state.interviewerTerm}&by_candidate=${this.state.candidateTerm}&by_any=${this.state.searchTerm}`+
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

    onSearchChange = (e) => {
        const searchTerm = e.target.value;
        //console.log("InterviewTErm: " + interviewTerm);
        this.setState({searchTerm}, () => {
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


    loadCurrentUserFromServer = () => {
        const headers = JSON.parse(localStorage.getItem('user'));
        //console.log("idInt:" + idInterview);
        let method = 'get';
        let self = this;
        
        axios({
            method: method,
            url: `${USERS_URL}/${headers.id}`,
            headers: headers
            })
        .then(function (response) {
            // handle success
            console.log("loadCurrentUserFromServer");
            console.log(response.data);

            self.setState({currentUserAdmin: response.data.admin});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    } 

    onBeforeDeleteResult = (idResult, positionResult) => {
        console.log("onBeforeDeleteResult:" + idResult + " "  + positionResult);
        //Set id of result to be deleted
        //set name of posicion to be deleted
        this.setState({
            modalDelete: true,
            idResultDelete: idResult,
            positionResultDelete: positionResult
        });
        // prompt user to confirm delete action
    }

    onDeleteResult = () => {
        console.log("onDeleteResult");
        this.toggle();
        this.deleteResultFromDatabase();
    }

    deleteResultFromDatabase = () => {
        let {idResultDelete} = this.state;
        console.log("deleteResultFromDatabase: "+ idResultDelete );

        const headers = JSON.parse(localStorage.getItem('user'));
        let self = this;
        axios({
            method: 'delete',
            url: `${PATH_BASE}/${idResultDelete}`,
            headers: headers
            })
        .then(function (response) {
            // handle success
            console.log("success deleteInterviewFromDatabase");
            console.log(response.data);
            self.setState({
                idResultDelete: null,
                positionResultDelete: ""
            }, self.loadResultsFromServer());
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    toggle = () => {
        this.setState(prevState => ({
          modalDelete: !prevState.modalDelete
        }));
    }

    render(){

        if(!this.state.resultsData){ return null;}

        const { t, i18n } = this.props;

        let pageComponent = <ReactPaginate
        previousLabel={t('before')}
        nextLabel={t('next')}
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
                <ModalGenericDelete
                    isOpen={this.state.modalDelete}
                    toggle={this.toggle}
                    modalTitle={t('results.delete_result')}
                    modalColor={"danger"}
                    onClick={this.onDeleteResult}
                    modalBody= {t('results.delete_result_body') }
                    modalBodyBold={this.state.positionResultDelete}
                    modalButton={t('results.delete')}
                    onChange={this.onInputChange}
                    nameToMatch={this.state.positionResultDelete}
                    disableOnClick={true}    
                    inputText=""
                    >
                    </ModalGenericDelete>
            <h2>{t('results.title')}</h2>
            <form className="container mb-2">
                    <fieldset>
                    <legend className="text-left">{t('results.search_result')}:</legend>
                    <div className="row align-items-center">
                        <div className="col-auto">
                        <label htmlFor="name" className=" col-form-label col-form-label-sm mr-2">{t('results.position')}: </label>
                        <input type="text" id="name" className="form-control-sm" onChange={this.onPositionChange}></input>
                        </div>
                        <div className="col-auto">
                        <label htmlFor="company" className=" col-form-label col-form-label-sm mr-2">{t('results.company')}:</label>
                        <input type="text" id="company" className="form-control-sm" onChange={this.onCompanyChange}></input>
                        </div>
                        <div className="col-auto">
                        <label htmlFor="candidate" className=" col-form-label col-form-label-sm mr-2">{t('results.candidate')}:</label>
                        <input type="text" id="candidate" className="form-control-sm" onChange={this.onCandidateChange}></input>
                        </div>

                        <div className="col-auto">
                        <label htmlFor="interviewer" className=" col-form-label col-form-label-sm mr-2">{t('results.interviewer')}: </label>
                        <input type="text" id="interviewer" className="form-control-sm" onChange={this.onInterviewerChange}></input>
                        </div>

                        <div className="col-auto">
                        <label htmlFor="allFields" className=" col-form-label col-form-label-sm mr-2">{t('results.search')}: </label>
                        <input type="text" id="allFields" className="form-control-sm" onChange={this.onSearchChange}></input>
                        </div>
                        
                    </div>
                    </fieldset>
                    <div className="row align-items-center mt-2">
                        <div className="col-auto">
                        <label htmlFor="sort" className=" col-form-label col-form-label-sm mr-2">{t('sort_by')}: </label>
                        <select className="form-control-sm" id="sort" onChange={this.onSortByChange}>
                        <option value="created_at;desc">{t('most_recently')}</option>
                        <option value="created_at;asc">{t('most_older')}</option>
                        <option value="position;asc">{t('results.position')} A-Z</option>
                        <option value="position;desc">{t('results.position')} Z-A</option>
                        </select>
                        </div>
                        
                        
                    </div>
                    <div className="mt-4">
                    <a href={PATH_BASE+ ".xlsx"} >{t('results.download')}</a>
                    </div>
                    
                    </form>
                    


            {pageComponent}
            <ResultsTable data={this.state.resultsData}
                currentUserAdmin={this.state.currentUserAdmin}
                onDelete = {this.onBeforeDeleteResult}
            ></ResultsTable>

            {pageComponent}
        </div>;
    }
}

export default withTranslation()( Results);