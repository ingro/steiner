import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import SidebarToggle from './SidebarToggle';
import './Sidebar.css';

class SidebarMenu extends Component {
    render() {
        return (
            <div className="Sidebar-Wrapper">
                <SidebarToggle position="sidebar" onClick={this.props.onToggle} />
                <ul>
                    {this.props.links.map((link, i) =>
                        <li key={i}><Link to={link.to} activeClassName="active">{link.name}</Link></li>
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