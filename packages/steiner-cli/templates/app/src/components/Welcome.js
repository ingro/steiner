import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

export default class Welcome extends Component {
    render() {
        const { user } = this.props;

        return (
            <div className="container">
                <Helmet>
                    <title>Welcome</title>
                </Helmet>
                <div className="jumbotron">
                    <h1>{process.env.REACT_APP_NAME}</h1>
                    {user
                        ? <h3>Welcome <span className="text-primary">{user.email}</span></h3>
                        : <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
                    }
                </div>
            </div>
        );
    }
}

Welcome.propTypes = {
    user: PropTypes.object
};
