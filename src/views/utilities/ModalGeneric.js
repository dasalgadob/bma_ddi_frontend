import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalGeneric extends Component {

    constructor(props){
        super(props);
        this.state = {
            textToMatch: this.props.textToMatch,
            disableOnClick: this.props.disableOnClick?this.props.disableOnClick:false,
            inputText: this.props.inputText
        };
    }


    onChangeInputField = (e) => {
        console.log("e.target.value:" + e.target.value);
        console.log("this.props.nameToMatch:" + this.props.nameToMatch);
        this.checkInputMatch(e.target.value);
        
    }

    checkInputMatch = (input) => {
        if(input.trim() == this.props.nameToMatch.trim()){
            console.log("match");
            this.setState({
                disableOnClick: false
            });
        }
        else{
            this.setState({
                disableOnClick: true
            });
        }
        this.setState({
            inputText: input
        });
    }

    renderInputField = () => {
        if(this.props.modalBodyBold != null){
            return (
                    <input type="text" onChange={this.onChangeInputField} value={this.state.inputText}></input>
                
            );
        }
    }

    render(){

        //this.checkInputMatch(this.state.inputText);
        console.log("this.props.modalBodyBold:" + this.props.modalBodyBold);
        return(
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
            <ModalHeader toggle={this.props.toggle}>{this.props.modalTitle}</ModalHeader>
            <ModalBody>
                {this.props.modalBody}
                <p className="text-danger">
                {this.props.modalBodyBold!= null?this.props.modalBodyBold:""}
                </p>
                {this.renderInputField()}
            </ModalBody>
            <ModalFooter>
                <Button color={this.props.modalColor} onClick={this.props.onClick}>{this.props.modalButton}</Button>{' '}
            </ModalFooter>
        </Modal>
        );
    }
}

export default ModalGeneric;