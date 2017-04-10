import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import SidebarToggle from './SidebarToggle';
import './Sidebar.css';

class SidebarMenu extends Component {
    render() {
        return (
            <div className="Sidebar__wrapper">
                <SidebarToggle position="sidebar" onClick={this.props.onToggle} />
                <ul>
                    {this.props.links.map((link, i) =>
                        <li key={i}><NavLink activeClassName="active" to={link.to}>{link.name}</NavLink></li>
                    )}
                </ul>
            </div>
        );
    }
}

SidebarMenu.propTypes = {
    onToggle: PropTypes.func.isRequired,
    links: PropTypes.array
};

SidebarMenu.defaultProps = {
    links: []
};

export default SidebarMenu;