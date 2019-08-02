import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';


class DimensionalAnswer extends Component{

    render(){
      const {t, i18n} = this.props;
        return(
        <div className=" ml-4 mr-4">
          <div className=" mt-2">
            <h5 className="font-weight-bold">{this.props.title}</h5>
        <p className="">{this.props.question}</p>
          <div className="border border border-secondary row">
            <div className="col-sm-3 border border-secondary">
              <p className="text-info">{t('result.task')}</p>
              <p>{this.props.situation}</p>
            </div>
            <div className="col-sm-3 border border-secondary">
              <p className="text-info">{t('result.action')}</p>
              <p>{this.props.action}</p>
            </div>
            <div className="col-sm-4 border border-secondary">
              <p className="text-info">{t('result.result')}</p>
              <p>{this.props.result}</p>
            </div>
            <div className="col-sm-2 border border-secondary">
              <p  className="text-info">{t('result.score')}</p>
              <p>{this.props.rating}</p>
              {/** 
              <p>{this.props.impact}</p>
              <p>{this.props.communication}</p>
              */}
            </div>
          </div>
          </div>
        </div>);
    }
}

export default withTranslation()(DimensionalAnswer);