import React, { Component, PropTypes} from 'react';
import Portal from 'react-portal';

import './Dropdown.css';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: false,
            top: 0,
            left: 0
        };
    }

    onClick = (e) => {
        if (this.state.isOpened) {
            this.setState({
                isOpened: false
            });

            return;
        }

        const bodyRect = document.body.getBoundingClientRect();
        const targetRect = e.target.getBoundingClientRect();

        const projectedLeft = targetRect.left - bodyRect.left;

        // console.warn('body left', bodyRect.left);
        // console.warn('target left', targetRect.left);
        // console.warn('final left', projectedLeft);

        // if ((projectedLeft + 160) >= bodyRect.right) {
        //     console.warn('OUT OF BOUNDS');
        // }
        
        this.setState({
            isOpened: true,
            top: targetRect.bottom - bodyRect.top,
            left: (projectedLeft + 160) >= bodyRect.right ? (targetRect.right - 160) : projectedLeft
        });
    }

    onClose = () => {
        setImmediate(() => this.setState({ isOpened: false }));
    }

    getPortalStyle() {
        const { top, left } = this.state;

        return {
            position: 'absolute',
            top,
            left
        };
    }

    renderNavbarDropdown() {
        return (
            <li
                className="dropdown" 
                onClick={this.onClick}
            >
                <a className="dropdown-toggle">
                    {this.props.text} <span className="caret" />
                </a>
                <Portal 
                    closeOnOutsideClick={true} 
                    isOpened={this.state.isOpened}
                    onClose={this.onClose}
                >
                    <ul className="Dropdown dropdown-menu" style={this.getPortalStyle()}>
                        {this.props.children}
                    </ul>
                </Portal>
            </li>
        );
    }

    renderButtonDropdown() {
        return (
            <span>
                <button 
                    className="btn btn-default dropdown-toggle"
                    onClick={this.onClick}
                >
                    {this.props.text} <span className="caret" />
                </button>
                <Portal 
                    closeOnOutsideClick={true} 
                    isOpened={this.state.isOpened}
                    onClose={this.onClose}
                >
                    <ul className="Dropdown dropdown-menu" style={this.getPortalStyle()}>
                        {this.props.children}
                    </ul>
                </Portal>
            </span>
        );
    }

    render() {
        return this.props.type === 'navbar' ? this.renderNavbarDropdown() : this.renderButtonDropdown();
    }
}

Dropdown.propTypes = {
    children: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['navbar', 'button']).isRequired
};

// TODO:
// - Possibilita di passare classe al type button
// - Impostare classe "active" sul type navbar quando open
// - Evitare che sia preso il caret come target