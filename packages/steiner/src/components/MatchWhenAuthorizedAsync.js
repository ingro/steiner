import React, { Component, PropTypes } from 'react';
import { Match, Redirect } from 'react-router';

// TODO: when ControlledRouter is released implement auth within redux store
// Inspired by https://github.com/jtmthf/react-router-match-async
class MatchWhenAuthorizedAsync extends Component {
    getComponent = () => {
        const { getComponent } = this.props;

        const maybePromise = getComponent((err, component) => {
            if (err) {
                this.errorHandler(err);
            } else {
                this.setComponent(component);
            }
        });

        if (maybePromise && typeof maybePromise.then === 'function') {
            maybePromise.then(this.setComponent)
                .catch(this.errorHandler);
        }
    }

    setComponent = (component) => {
        this.component = component;
        this.setState({ loaded: true });
    }

    errorHandler = (err) => {
        const { onError } = this.props;

        if (onError) {
            onError(err);
        } else {
            throw err;
        }
    }

    renderComponent(props) {
        const { component, getComponent } = this;

        if (component === undefined) {
            getComponent();
        }

        return component !== undefined ? React.createElement(component, props) : <span />;
    }

    render() {
        const { user, redirectTo, ...rest } = this.props;

        return <Match {...rest} render={props => {
            return user ? 
                this.renderComponent(props)
            : (
                <Redirect to={{
                    pathname: redirectTo,
                    state: { from: props.location }
                }}/>
            )
        }}/>;
    }
}

MatchWhenAuthorizedAsync.props = {
    getComponent: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    onError: PropTypes.func,
    redirectTo: PropTypes.string,
    user: PropTypes.object
};

MatchWhenAuthorizedAsync.defaultProps = {
    redirectTo: '/login'
};

export default MatchWhenAuthorizedAsync;