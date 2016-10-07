import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Match, Link } from 'react-router';
import NotificationsSystem from 'reapop';
import LoadingBar from 'react-redux-loading-bar';
import theme from 'reapop-theme-wybo';
import { MatchWhenAuthorized, MatchWhenGuest, HeaderLink, auth, createConfirm } from 'steiner';
import { getUser } from 'steiner/lib/auth/reducer';

import './App.css';
import Welcome from './components/Welcome';
import LoginForm from './components/LoginForm';
import routes from './routes';

class App extends Component {
    requestLogout = () => {
        this.props.dispatch(createConfirm({
            title: 'Logout',
            message: 'Are you really want to exit from the application?',
            onSuccess: () => this.props.dispatch(auth.actions.logoutRequest())
        }));
    }

    render() {
        const { user } = this.props;

        return (
            <BrowserRouter>
                <div>
                    <div className="navbar navbar-default">
                        <LoadingBar style={{ zIndex: 1 }} updateTime={250} maxProgress={95} />
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <Link className="navbar-brand" to="/">${appName}</Link>
                            </div>
                            <div className="collapse navbar-collapse">
                                <ul className="nav navbar-nav">
                                    {/* <HeaderLink to="/posts" name="Posts" /> */}
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
                        <Match pattern="/" exactly={true} render={() => <Welcome user={user}/>} />
                        {routes.map((route, i) => (
                            <MatchWhenAuthorized key={i} user={user} {...route}/>
                        ))}
                        <MatchWhenGuest pattern="/login" exactly={true} component={LoginForm} user={user}/>
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
