import React, { Component, PropTypes } from 'react';

class SidebarToggle extends Component {
    render() {
        return (
            <button type="button" className={`${this.props.position}-toggle`} onClick={this.props.onClick}>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
            </button>
        );
    }
}

SidebarToggle.propTypes = {
    position: PropTypes.oneOf(['navbar', 'sidebar']),
    onClick: PropTypes.func.isRequired
};

export default SidebarToggle;