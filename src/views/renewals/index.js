import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import RenewalsTable from './RenewalsTable';

const axios = require('axios');

const RENEWALS_LIST_PATH = `${process.env.REACT_APP_BACKEND_URL}/contract_renewal_lists`;

class  RenewalsList extends Component {

    constructor(props){
        super(props);
        this.state = {
            renewalsData: null,
            currentPage: 1
        };
    }

    /** Load the renewals list from the server */
    componentDidMount(){
        this.loadRenewalsFromServer();
    }


    loadRenewalsFromServer(){
        console.log("componentDidMount");
        console.log("Do notgnb");
        const headers = JSON.parse(localStorage.getItem('user'));
        let self = this;
        axios({
            method: 'get',
            url: `${RENEWALS_LIST_PATH}`,
            headers: headers
            })
        .then(function (response) {
            // handle success
            console.log("then");
            console.log(response.data);
            self.setState({ renewalsData: response.data});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    handlePageClick = data => {
        let selected = data.selected + 1;
        console.log("selected:" + selected);
    
        this.setState({ currentPage: selected }, () => {
          this.loadRenewalsFromServer();
        });
      };

    render(){
        if(!this.state.renewalsData){
            return null;
        }

        const { t, i18n } = this.props;

        let pageComponent = <ReactPaginate
        previousLabel={t('before')}
        nextLabel={t('next')}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={this.state.renewalsData["pages"]}
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

        return(
            <div>
                <h2 className="mb-3 mt-2">{t('renewals.title')}</h2>


                
                <div className="container">
                    {pageComponent}
                    {/** index [1] is for just the data, in index[0] the pagination data is located */}
                    <RenewalsTable data={this.state.renewalsData[1]}>
                    </RenewalsTable>
                    {pageComponent}
                    {/**  Button to create new renewal lists*/}
                    <div className="row align-items-left">
                    <Link to='renewalsList/new' className=" btn btn-primary">
                        <FontAwesomeIcon icon={faPlus} /> {t('renewals.create')}
                    </Link>
                    </div>
                    
                </div>
            </div>
        );

    }
}


export default withTranslation()(RenewalsList); 