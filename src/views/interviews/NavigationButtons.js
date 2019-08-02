import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

/**Contains next and before buttons */
class NavigationButtons extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const {t, i18} = this.props;
        return(<form className="container">
        <div className=" ">
            <div className="d-flex flex-row mt-3">
                <button type="button" 
                        className="btn btn-primary  mx-2 mr-auto"
                        onClick={this.props.handleBeforeButton}>{t('back')}</button>
                <div className="btn-toolbar">
                <button type="button"
                        onClick={this.props.handleNextButton} 
                        className="btn btn-primary  ml-auto mx-1">{t('next')}</button>
                </div>
            </div>
        </div>
    </form>);
    }
}

export default withTranslation()(NavigationButtons);