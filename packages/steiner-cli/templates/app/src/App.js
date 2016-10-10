import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Match, Link } from 'react-router';
import NotificationsSystem from 'reapop';
import LoadingBar from 'react-redux-loading-bar';
import Sidebar from 'react-sidebar';
import theme from 'reapop-theme-wybo';
import { MatchWhenAuthorized, MatchWhenGuest, HeaderLink, auth, createConfirm } from 'steiner';
import { getUser } from 'steiner/lib/auth/reducer';

import './App.css';
import Welcome from './components/Welcome';
import LoginForm from './components/LoginForm';
import Breadcrumb from './components/Breadcrumb';
import SidebarToggle from './components/SidebarToggle';
import SidebarMenu from './components/SidebarMenu';
import routes from './routes';

const sidebarMenuLinks = [
    /*{
        to: '/posts',
        name: 'Posts'
    }*/
];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSidebarOpen: false
        };
    }

    toggleSidebar = () => {
        this.setState({
            isSidebarOpen: ! this.state.isSidebarOpen
        });
    }

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
                    <LoadingBar style={{ zIndex: 3 }} updateTime={250} maxProgress={95} />
                    <Sidebar 
                        sidebar={<SidebarMenu links={sidebarMenuLinks} onToggle={this.toggleSidebar}/>} 
                        docked={this.state.isSidebarOpen} 
                        transitions={false}
                    >
                        <div className={this.state.isSidebarOpen ? 'sidebar-is-open' : ''}>
                            <div className="navbar navbar-default">
                                <div className="container-fluid">
                                    <div className="navbar-header">
                                        {! this.state.isSidebarOpen &&
                                            <SidebarToggle position="navbar" onClick={this.toggleSidebar} />
                                        }
                                        <Link className="navbar-brand" to="/">{process.env.REACT_APP_NAME}</Link>
                                    </div>
                                    <div className="collapse navbar-collapse">
                                        {/*<ul className="nav navbar-nav">
                                            <HeaderLink to="/posts" name="Posts" />
                                        </ul>*/}
                                        <ul className="nav navbar-nav navbar-right">
                                            {user 
                                                ? <li><a onClick={this.requestLogout}>Logout</a></li>
                                                : <HeaderLink to="/login" name="Login" />
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <Breadcrumb routes={routes}/>
                            <div className="container-fluid">
                                <Match pattern="/" exactly={true} render={() => <Welcome user={user}/>} />
                                {routes.map((route, i) => (
                                    <MatchWhenAuthorized key={i} user={user} {...route}/>
                                ))}
                                <MatchWhenGuest pattern="/login" exactly={true} component={LoginForm} user={user}/>
                            </div>
                        </div>
                    </Sidebar>
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
