import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Match, Link } from 'react-router';
import NotificationsSystem from 'reapop';
import LoadingBar from 'react-redux-loading-bar';
import Sidebar from 'react-sidebar';
import Helmet from 'react-helmet';
import theme from 'reapop-theme-wybo';
import { MatchWhenAuthorized, MatchWhenGuest, HeaderLink, auth, createConfirm } from 'steiner';
import { getUser } from 'steiner/lib/auth/reducer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Dropdown from 'vivi/lib/Dropdown';

import routeRegister from 'helpers/routeRegister';
import Welcome from './components/Welcome';
import LoginForm from './components/LoginForm';
import Breadcrumb from './components/Breadcrumb';
import SidebarToggle from './components/SidebarToggle';
import SidebarMenu from './components/SidebarMenu';
import Omnibox from './components/Omnibox';
import Settings from './components/Settings';
import Profile from './components/Profile';
import routes from './routes';

import KeyBinderHoc from './components/KeyBinder';

const sidebarMenuLinks = routeRegister.getSidebarLinks();

const omniboxOptions = routeRegister.getOmniboxOptions();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOmniboxOpen: false,
            isSidebarOpen: false
        };
    }

    componentWillMount() {
        this.props.bindShortcut(['ctrl+p', 'command+p'], (e) => {
            e.preventDefault();
            this.toggleOmnibox();
        }, true);
    }

    toggleSidebar = () => {
        this.setState({
            isSidebarOpen: ! this.state.isSidebarOpen
        });
    }

    toggleOmnibox = () => {
        this.setState({
            isOmniboxOpen: ! this.state.isOmniboxOpen
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
                    <Helmet
                        title="App"
                        titleTemplate={`${process.env.REACT_APP_NAME} | %s`}
                    />
                    <ReactCSSTransitionGroup
                        transitionName="slide"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                    >
                        {this.state.isOmniboxOpen && <Omnibox key="omnibox" onChange={this.toggleOmnibox} options={omniboxOptions}/>}
                    </ReactCSSTransitionGroup>
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
                                        <Breadcrumb routes={routes}/>
                                    </div>
                                    <div className="collapse navbar-collapse">
                                        {/*<ul className="nav navbar-nav">
                                            <HeaderLink to="/hotels" name="Hotels" />
                                            <HeaderLink to="/offers" name="Offers" />
                                        </ul>*/}
                                        <ul className="nav navbar-nav navbar-right">
                                            {user
                                                ? <Dropdown text={<i className="fa fa-cog" />} type="navbar">
                                                    <li className="dropdown-header">{user.email}</li>
                                                    <li><Link to="/profile">Profile</Link></li>
                                                    <li><Link to="/settings">Settings</Link></li>
                                                    <li role="separator" className="divider"></li>
                                                    <li><a onClick={this.requestLogout}>Logout</a></li>
                                                </Dropdown>
                                                : <HeaderLink to="/login" name="Login" />
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="container-fluid">
                                <Match pattern="/" exactly={true} render={() => <Welcome user={user}/>} />
                                <Match pattern="/settings" component={Settings}/>
                                <Match pattern="/profile" component={Profile}/>
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

const KeyedApp = KeyBinderHoc(App);

export default connect(state => ({ user: getUser(state) }))(KeyedApp);
