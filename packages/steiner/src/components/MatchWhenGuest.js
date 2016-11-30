import React, { Component, PropTypes } from 'react';
import { Match, Redirect } from 'react-router';
import get from 'lodash/get';

class MatchWhenGuest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authorized: props.user
        };
    }

    componentWillReceiveProps(nextProps) {
        // User logged in
        if (nextProps.user && !this.props.user) {
            setTimeout(() => {
                this.setState({
                    authorized: true
                });
            }, 500);
        }
    }

    render() {
        const { component: Component, user, defaultRedirectTo, ...rest } = this.props;

        return <Match {...rest} render={props => {
            return (!user || !this.state.authorized) ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: get(props.location, 'state.from.pathname') ? get(props.location, 'state.from.pathname') : defaultRedirectTo,
                    search: get(props.location, 'state.from.search') ? get(props.location, 'state.from.search') : '',
                    state: {}
                }}/>
            )
        }}/>;
    }
}

MatchWhenGuest.propTypes = {
    component: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired,
    defaultRedirectTo: PropTypes.string,
    user: PropTypes.object
};

MatchWhenGuest.defaultProps = {
    defaultRedirectTo: '/'
};

export default MatchWhenGuest;