import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalGeneric extends Component {
    render(){

        return(
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
            <ModalHeader toggle={this.props.toggle}>{this.props.modalTitle}</ModalHeader>
            <ModalBody>
                {this.props.modalBody}
                
            </ModalBody>
            <ModalFooter>
                <Button color={this.props.modalColor} onClick={this.props.onClick}>{this.props.modalButton}</Button>{' '}
            </ModalFooter>
        </Modal>
        );
    }
}

export default ModalGeneric;