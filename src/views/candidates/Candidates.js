import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

import ReactPaginate from 'react-paginate';

const PATH_BASE = `${process.env.REACT_APP_BACKEND_URL}/candidates`;

class Candidates extends Component{

    constructor(props){
        super(props);
        this.state = {
            candidatesDataAll: null,
            candidatesDataPaging: null,
            candidatesData: null,
            currentPage: 1,
            nameTerm: "",
            emailTerm: "",
            sortByField: '',
            sortOrder: '',
        };
        console.log("contructor");
        this.setCandidates = this.setCandidates.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
    }

    componentDidMount(){
        this.loadCandidatesFromServer();
    }

    loadCandidatesFromServer(){
        let queryURL = `${PATH_BASE}?page=${this.state.currentPage}` +
        `&by_name=${this.state.nameTerm}&by_email=${this.state.emailTerm}`+
        `&sort=${this.state.sortByField}`+
        `&direction=${this.state.sortOrder}`;
        console.log("Query URL:" + queryURL);
        fetch(queryURL)
        .then(response => response.json())
        .then(result => this.setCandidates(result))
        .catch(error => error);
    }

    setCandidates(data){
        this.setState({candidatesDataAll: data, candidatesData: data[1], candidatesDataPaging: data[0]});
    }


    onNameChange(e){
        const positionTerm = e.target.value;
        //console.log("InterviewTErm: " + interviewTerm);
        this.setState({nameTerm: positionTerm}, () => {
            this.loadCandidatesFromServer();
          });
    }

    onEmailChange(e){
        const companyTerm = e.target.value;
        //console.log("InterviewTErm: " + interviewTerm);
        this.setState({emailTerm: companyTerm}, () => {
            this.loadCandidatesFromServer();
          });
    }

    handlePageClick = data => {
        let selected = data.selected + 1;
        console.log("selected:" + selected);
    
        this.setState({ currentPage: selected }, () => {
          this.loadCandidatesFromServer();
        });
      };

    render(){


        if(!this.state.candidatesData){ return null;}
        let data = this.state.candidatesData;

        const {t, i18n} = this.props;

        let pageComponent = <ReactPaginate
        previousLabel={t('before')}
        nextLabel={t('next')}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={this.state.candidatesDataPaging["pages"]}
        marginPagesDisplayed={2}
        pageRangeDisplayed={4}
        onPageChange={this.handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
        />;

        return(<div>
            <div className="container">


            <form className="container mb-2">
                <fieldset>
                <legend className="text-left">{t('fill.candidate_form.search_candidate')}:</legend>
                <div className="row align-items-center">
                    <div className="col-auto">
                    <label htmlFor="name" className=" col-form-label col-form-label-sm mr-2">{t('fill.candidate_form.name')}: </label>
                    <input type="text" id="name" className="form-control-sm" onChange={this.onNameChange}></input>
                    </div>
                    <div className="col-auto">
                    <label htmlFor="company" className=" col-form-label col-form-label-sm mr-2">{t('fill.candidate_form.email')}:</label>
                    <input type="text" id="em" className="form-control-sm" onChange={this.onEmailChange}></input>
                    </div>
                    
                </div>
                </fieldset>
                <div className="row align-items-center mt-2">
                    <div className="col-auto">
                    <label htmlFor="sort" className=" col-form-label col-form-label-sm mr-2">{t('sort_by')}: </label>
                    <select className="form-control-sm" id="sort" onChange={this.onSortByChange}>
                    <option value="created_at;desc">{t('most_recently')}</option>
                    <option value="created_at;asc">{t('most_older')}</option>
                    <option value="name;asc">{t('fill.candidate_form.candidate_name')} A-Z</option>
                    <option value="name;desc">{t('fill.candidate_form.candidate_name')} Z-A</option>
                    </select>
                    </div>                        
                </div>
            </form>

            {pageComponent}
            <table className="table table-bordered table-hover table-sm">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" >id</th>
                        <th scope="col">{t('fill.candidate_form.name')}</th>
                        <th scope="col">{t('fill.candidate_form.email')}</th>
                        <th scope="col">{t('created_at')}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {data.map( item => 
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.created_at}</td>
                            <td><button  className="btn btn-primary" id={item.id}
                                        onClick={this.props.onChooseCandidate}>{t('fill.candidate_form.select')}</button></td>
                        </tr>)}
                </tbody>
            </table>

            {pageComponent}
        </div>

        </div>);
    }
}

export default withTranslation()(Candidates);