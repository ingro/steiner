import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'vivi/lib/Modal';

export default class ModalHelp extends Component {
    render() {
        const { isOpen, onClose } = this.props;

        return (
            <Modal 
                className="modal-dialog"
                isOpen={isOpen} 
                onClose={onClose}
                staticModal={false}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h4 className="modal-title">{process.env.REACT_APP_NAME}'s Help</h4>
                    </div>
                    <div className="modal-body">
                        <h4>Global key bindings</h4>
                        <ul>
                            <li><strong>CTRL+B:</strong> toggle the sidebar</li>
                            <li><strong>CTRL+P:</strong> toggle the omnibox</li>
                            <li><strong>CTRL+H:</strong> toggle help</li>
                        </ul>
                        {/*<h4>List key bindings</h4>
                        <ul>
                            <li><strong>CTRL+D:</strong> create new item</li>
                        </ul>*/}
                        <h4>Edit key bindings</h4>
                        <ul>
                            <li><strong>CTRL+S:</strong> save the item</li>
                        </ul>
                    </div>
                </div>
            </Modal>
        );
    }
}

ModalHelp.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired
};

ModalHelp.defaultProps = {
    isOpen: false
};