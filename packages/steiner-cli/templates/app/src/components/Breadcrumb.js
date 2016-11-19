import React, { Component, PropTypes } from 'react';
import { Match, Link } from 'react-router';
import { connect } from 'react-redux';

import './Breadcrumb.css';

class BreadcrumbElement extends Component {
    render() {
        return (
            <li className={this.props.isExact ? 'active' : ''}>
                {this.props.isExact
                    ? this.props.breadcrumbName
                    : <Link to={this.props.pathname}>{this.props.breadcrumbName}</Link>
                }
            </li>
        );
    }
}

const BreadcrumbMatch = (route) => {
    const matchRoute = {
        ...route,
        exactly: false
    };

    return <Match {...matchRoute} render={(props) => {
        if (typeof route.breadcrumb === 'string') {
            return <BreadcrumbElement {...props} breadcrumbName={route.breadcrumb} />;
        } else {
            const ConnectedBreadcrumbElement = connect(route.breadcrumb)(BreadcrumbElement);
            return <ConnectedBreadcrumbElement {...props} />;
        }
    }}/>;
};

export default class Breadcrumb extends Component {
    render() {
        return ( 
            <ol className="breadcrumb Breadcrumb-navbar">
                {this.props.routes.map((route, i) => (
                    <BreadcrumbMatch key={i} {...route}/>
                ))}
            </ol>
        );
    }
}

Breadcrumb.propTypes = {
    routes: PropTypes.array
};

Breadcrumb.defaultProps = {
    routes: []
};