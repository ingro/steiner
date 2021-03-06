import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import get from "lodash/get";

class MatchWhenGuest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authorized: props.user
    };
  }

  componentDidUpdate(prevProps) {
    // User logged in
    if (this.props.user && !prevProps.user) {
      // This to avoid a redirect before the old component get unmounted correctly
      setTimeout(() => {
        this.setState({
          authorized: true
        });
      }, 500);
    }

    // User logged out
    if (!this.props.user && prevProps.user) {
      this.setState({
        authorized: false
      });
    }
  }

  render() {
    const {
      component: Component,
      user,
      defaultRedirectTo,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={props => {
          return !user || !this.state.authorized ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: get(props.location, "state.from.pathname")
                  ? get(props.location, "state.from.pathname")
                  : defaultRedirectTo,
                search: get(props.location, "state.from.search")
                  ? get(props.location, "state.from.search")
                  : "",
                state: {}
              }}
            />
          );
        }}
      />
    );
  }
}

MatchWhenGuest.propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
  defaultRedirectTo: PropTypes.string,
  user: PropTypes.object
};

MatchWhenGuest.defaultProps = {
  defaultRedirectTo: "/"
};

export default MatchWhenGuest;
