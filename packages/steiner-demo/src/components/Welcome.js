import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import Dropdown from './Dropdown';

class Welcome extends Component {
    render() {
        const { user } = this.props;

        return (
            <div className="container">
                <Helmet title="Welcome" />
                <div className="jumbotron">
                    <h1>Steiner</h1>
                    {user 
                        ? <h3>Welcome <span className="text-primary">{user.email}</span></h3>
                        : <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
                    }
                </div>
                <div className="pull-left">
                    <Dropdown text="Open it!" type="button">
                        <li>
                            <Link to="/hotels">Hotels</Link>
                        </li>
                        <li>
                            <Link to="/offers">Offers</Link>
                        </li>
                    </Dropdown>
                </div>
                
            </div>
        );
    }
}

export default Welcome;