import React, { Component } from 'react';

import PropTypes from 'prop-types';

class SidebarToggle extends Component {
    render() {
        return (
            <button type="button" className={`Sidebar__${this.props.position}-toggle`} onClick={this.props.onClick}>
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