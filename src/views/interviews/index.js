
import React, { Component } from 'react';
import Table from '../utilities/Table';
import ReactPaginate from 'react-paginate';
import { Switch, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { withTranslation } from 'react-i18next';

//const PATH_BASE = 'http://localhost:3000/interviews';

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/interviews`;
console.log(PATH_BASE);
class  Interviews extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: null,
            currentPage: 1,
            interviewTerm: "",
            companyTerm: "",
            interviewerTerm: "",
            sortByField: "",
            sortOrder: "",
            };

        this.setInterviews = this.setInterviews.bind(this);    
        this.onInterviewChange = this.onInterviewChange.bind(this);
        this.onCompanyChange = this.onCompanyChange.bind(this);
        this.onInterviewerChange = this.onInterviewerChange.bind(this);
        //this.onSortByChange = this.onSortByChange.bind(this);
    }

    onInterviewChange(e){
        const interviewTerm = e.target.value;
        //console.log("InterviewTErm: " + interviewTerm);
        this.setState({interviewTerm: interviewTerm}, () => {
            this.loadInterviewsFromServer();
          });
    }

    onCompanyChange(e){
        const companyTerm = e.target.value;
        //console.log("InterviewTErm: " + interviewTerm);
        this.setState({companyTerm: companyTerm}, () => {
            this.loadInterviewsFromServer();
          });
    }

    onInterviewerChange(e){
        const interviewerTerm = e.target.value;
        //console.log("InterviewTErm: " + interviewTerm);
        this.setState({interviewerTerm: interviewerTerm}, () => {
            this.loadInterviewsFromServer();
          });
    }

    onSortByChange = (e) => {
        const sortByTerm = e.target.value.split(';');
        const sortByField =  sortByTerm[0];
        const sortOrder = sortByTerm[1];
        console.log("sortByField: " + sortByField);
        console.log("sortOrder: " + sortOrder);
        this.setState({sortByField: sortByField,  sortOrder: sortOrder}, () => {
            this.loadInterviewsFromServer();
          });
    }


    setInterviews(result){
        this.setState({result});
    }

    loadInterviewsFromServer(){
        let queryURL = `${PATH_BASE}?page=${this.state.currentPage}` +
        `&by_name=${this.state.interviewTerm}&by_company=${this.state.companyTerm}` +
        `&by_interviewer=${this.state.interviewerTerm}&sort=${this.state.sortByField}`+
        `&direction=${this.state.sortOrder}`;
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
        const { t, i18n } = this.props;
        const { result } = this.state;

        

        if(!result){ return null;}

        const reactPaginate = <ReactPaginate
            previousLabel={t('before')}
            nextLabel={t('next')}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.result[0]["pages"]}
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

        //console.log(this.state);
        return <div>
                    <h2 className="mb-3 mt-2">{t('interviews.title_lower')}</h2>
                    <div className="container">
                        <div className="row align-items-left">
                        <Link to='interviews/new' className=" btn btn-primary">
                            <FontAwesomeIcon icon={faPlus} /> {t('create.title')}
                        </Link>
                        </div>
                        
                    </div>
                    
                    <form className="container mb-2">
                    <fieldset>
                    <legend className="text-left">{t('search_interview')}:</legend>
                    <div className="row align-items-center">
                        <div className="col-auto">
                        <label htmlFor="name" className=" col-form-label col-form-label-sm mr-2">{t('interview')}: </label>
                        <input type="text" id="name" className="form-control-sm" onChange={this.onInterviewChange}></input>
                        </div>
                        <div className="col-auto">
                        <label htmlFor="company" className=" col-form-label col-form-label-sm mr-2">{t('company')}:</label>
                        <input type="text" id="company" className="form-control-sm" onChange={this.onCompanyChange}></input>
                        </div>
                        <div className="col-auto">
                        <label htmlFor="interviewer" className=" col-form-label col-form-label-sm mr-2">{t('interviewer')}:</label>
                        <input type="text" id="interviewer" className="form-control-sm" onChange={this.onInterviewerChange}></input>
                        </div>
                        
                    </div>
                    </fieldset>
                    <div className="row align-items-center mt-2">
                        <div className="col-auto">
                        <label htmlFor="sort" className=" col-form-label col-form-label-sm mr-2">{t('sort_by')}: </label>
                        <select className="form-control-sm" id="sort" onChange={this.onSortByChange}>
                        <option value="created_at;desc">{t('most_recently')}</option>
                        <option value="created_at;asc">{t('most_older')}</option>
                        <option value="name;asc">{t('interview_name')} A-Z</option>
                        <option value="name;desc">{t('interview_name')} Z-A</option>
                        </select>
                        </div>
                        
                        
                    </div>
                    </form>
                    {reactPaginate}
                    <div className="page">
                    <Table
                    list={result[1]}
                    />
                    {reactPaginate}
                    </div>
                </div>;
        
    }
    
  }

 export default withTranslation()(Interviews); 