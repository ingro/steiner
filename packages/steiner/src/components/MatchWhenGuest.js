import React, { PropTypes } from 'react';
import { Match, Redirect } from 'react-router';
import get from 'lodash/get';

// TODO: when ControlledRouter is released implement auth within redux store
const MatchWhenGuest = ({ component: Component, user, defaultRedirectTo, ...rest }) => {
    return <Match {...rest} render={props => {
        return ! user ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: get(props.location, 'state.from.pathname') ? get(props.location, 'state.from.pathname') : defaultRedirectTo,
                search: get(props.location, 'state.from.search') ? get(props.location, 'state.from.search') : '',
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