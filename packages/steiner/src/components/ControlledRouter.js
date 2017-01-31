import React, { Component, PropTypes } from 'react';
import Router from './ControlledBrowserRouter';

import { navigate } from '../routing/actions';

export default class ControlledRouter extends Component {
    render() {
        return (
            <Router
                history={this.props.history}
                location={this.props.location}
                action={this.props.action}
                basename={this.props.basename}
                onChange={(location, action) => {
                    if (action !== 'SYNC') {
                        this.props.dispatch(navigate(location, action));
                    } else {
                        // Do nothing
                    }
                }}
            >
                {this.props.children}
            </Router>
        );
    }
}

ControlledRouter.propTypes = {
    action: PropTypes.string.isRequired,
    basename: PropTypes.string,
    children: PropTypes.any,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};