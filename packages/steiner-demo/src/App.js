import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Match, Link } from 'react-router';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';

import './App.css';
import HeaderLink from './components/HeaderLink';
import LoginForm from './components/LoginForm';
import { MatchWhenAuthorized } from 'steiner';
import { MatchWhenGuest } from 'steiner';
import routes from './routes';
import { getUser } from 'steiner/lib/auth/reducer';

class App extends Component {
    requestLogout = () => {
        this.props.dispatch({ type: 'LOGOUT_REQUEST' });
    }

    render() {
        const { user } = this.props;

        return (
            <BrowserRouter>
                <div>
                    <div className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <Link className="navbar-brand" to="/">Steiner</Link>
                            </div>
                            <div className="collapse navbar-collapse">
                                <ul className="nav navbar-nav">
                                    <HeaderLink to="/hotels" name="Hotels" />
                                    <HeaderLink to="/offers" name="Offers" />
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    {user 
                                        ? <li><a onClick={this.requestLogout}>Logout</a></li>
                                        : <HeaderLink to="/login" name="Login" />
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <Match pattern="/" exactly={true} render={() =>
                            <div className="container">
                                <div className="jumbotron">
                                    <h1>Steiner</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dicta, error autem magnam adipisci voluptas dolorum corporis possimus accusantium distinctio reprehenderit quo necessitatibus officia quod explicabo dolor alias provident excepturi.</p>
                                </div>
                            </div>
                        }/>
                        {routes.map((route, i) => (
                            <MatchWhenAuthorized key={i} user={user} {...route}/>
                        ))}
                        <MatchWhenGuest pattern="/login" exactly={true} component={LoginForm} />
                    </div>
                    <NotificationsSystem
                        theme={theme}
                        defaultValues={{
                            position: "br",
                            closeButton: true,
                            allowHTML: true
                        }}
                    />
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(state => ({ user: getUser(state) }))(App);
