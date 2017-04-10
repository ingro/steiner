import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

export default class HeaderLink extends Component {
    render() {
        const { to, text } = this.props;

        return (
            <Route
                path={to}
                children={({ match }) => {
                    return (
                        <li className={match ? 'active' : ''}>
                            <Link to={to}>{text}</Link>
                        </li>
                    );
                }}
            />
        );
    }
}

HeaderLink.propTypes = {
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
};