import React, { Component, PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Breadcrumb.css';

class BreadcrumbElement extends Component {
    render() {
        return (
            <li className={this.props.match.isExact ? 'active' : ''}>
                {this.props.match.isExact
                    ? this.props.breadcrumbName
                    : <Link to={this.props.match.url}>{this.props.breadcrumbName}</Link>
                }
            </li>
        );
    }
}

const BreadcrumbMatch = (route) => {
    const matchRoute = {
        ...route,
        exact: false
    };

    return <Route {...matchRoute} render={(props) => {
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