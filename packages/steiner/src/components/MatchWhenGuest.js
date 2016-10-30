import React, { PropTypes } from 'react';
import { Match, Redirect } from 'react-router';

// TODO: when ControlledRouter is released implement auth within redux store
const MatchWhenGuest = ({ component: Component, user, defaultRedirectTo, ...rest }) => {
    return <Match {...rest} render={props => {
        return ! user ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: (props.location.state.from) ? props.location.state.from.pathname : defaultRedirectTo,
                search: (props.location.state.from) ? props.location.state.from.search : '',
                state: {}
            }}/>
        )
    }}/>
};

MatchWhenGuest.props = {
    component: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    defaultRedirectTo: PropTypes.string,
    user: PropTypes.object
};

MatchWhenGuest.defaultProps = {
    defaultRedirectTo: '/'
};


export default MatchWhenGuest;