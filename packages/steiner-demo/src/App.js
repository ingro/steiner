import React, { Component } from 'react';
import { BrowserRouter, Match, Link } from 'react-router';
import NotificationsSystem from 'reapop';
import theme from 'steiner/lib/misc/notifications/flat-theme';

import './App.css';
import HeaderLink from './components/HeaderLink';
import LoginForm from './components/LoginForm';
import routes from './routes';

class App extends Component {
    render() {
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
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        {routes.map((route, i) => (
                            <Match key={i} {...route}/>
                        ))}
                        <Match pattern="/login" exactly={true} component={LoginForm} />
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

export default App;
