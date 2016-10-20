import React, { Component, PropTypes } from 'react';
import Router from 'react-router-addons-controlled/ControlledBrowserRouter';

import { navigate } from '../routing/actions';

export default class ControlledRouter extends Component {
    render() {
        return (
            <Router
                history={this.props.history}
                location={this.props.location}
                action={this.props.action}
                onChange={(location, action) => {
                    // console.warn(location);
                    // console.warn(action);

                    if (action !== 'SYNC') {
                        this.props.dispatch(navigate(location, action));
                    } else {
                        // this.props.dispatch({
                        //     type: 'NAVIGATE',
                        //     location,
                        //     action: this.props.action
                        // });
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
    children: PropTypes.any,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};