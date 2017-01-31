import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';

// TODO: when ControlledRouter is released implement auth within redux store
const MatchWhenAuthorized = ({ component: Component, user, redirectTo, ...rest }) => {
    return <Route {...rest} render={props => {
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

MatchWhenAuthorized.propTypes = {
    component: PropTypes.any.isRequired,
    location: PropTypes.object,
    redirectTo: PropTypes.string,
    user: PropTypes.object
};

MatchWhenAuthorized.defaultProps = {
    redirectTo: '/login'
};

export default MatchWhenAuthorized;