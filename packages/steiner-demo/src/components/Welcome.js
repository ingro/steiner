import React, { Component } from 'react';
import { Link } from 'react-router';
import Select from 'vivi/dist/Select';

export default class Welcome extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Steiner</h1>
                    {user 
                        ? <h3>Welcome <span className="text-primary">{user.email}</span></h3>
                        : <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
                    }
                    <Select />
                </div>
            </div>
        );
    }
}
