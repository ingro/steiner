import React, { PropTypes } from 'react';
import { Match, Redirect } from 'react-router';

// TODO: when ControlledRouter is released implement auth within redux store
const MatchWhenAuthorized = ({ component: Component, user, redirectTo, ...rest }) => {
    return <Match {...rest} render={props => {
        return user ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: redirectTo,
                state: { from: props.location }
            }}/>
        )
    }}/>
};

MatchWhenAuthorized.props = {
    component: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    redirectTo: PropTypes.string,
    user: PropTypes.object
};

MatchWhenAuthorized.defaultProps = {
    redirectTo: '/login'
};

export default MatchWhenAuthorized;