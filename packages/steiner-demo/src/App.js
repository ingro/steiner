import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch/*, BrowserRouter*/ } from 'react-router-dom';
import NotificationsSystem from 'reapop';
import LoadingBar from 'react-redux-loading-bar';
import Sidebar from 'react-sidebar';
import Helmet from 'react-helmet';
import theme from 'reapop-theme-wybo';
import { ControlledRouter, MatchWhenAuthorized, MatchWhenAuthorizedAsync, MatchWhenGuest, KeyBinderHoc } from 'steiner';
import { getUser } from 'steiner/lib/auth/reducer';
import { getCurrentRoute } from 'steiner/lib/routing/reducer';
import { getSettings } from 'steiner/lib/settings/reducer';
import { setTranslations } from 'steiner/lib/settings/actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TranslatorProvider from 'vivi/lib/TranslatorProvider';

import routeRegister from 'helpers/routeRegister';
import Header from './components/Header';
import Welcome from './components/Welcome';
import LoginForm from './components/LoginForm';
import SidebarMenu from './components/SidebarMenu';
import Omnibox from './components/Omnibox';
import Profile from './components/Profile';
import ModalHelp from './components/ModalHelp';
import routes from './routes';
import history from './history';
// import ControlledRouter from './components/Router/ControlledRouter';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOmniboxOpen: false,
            isSidebarOpen: true,
            isHelpModalOpen: false,
            isLanguageLoaded: false
        };

        this.sidebarMenuLinks = [];
        this.omniboxOptions = [];
    }

    componentDidMount() {
        const language = this.props.settings.language || process.env.REACT_APP_DEFAULT_LANGUAGE;

        this.loadTranslations(language);

        this.props.bindShortcut(['ctrl+p', 'command+p'], (e) => {
            e.preventDefault();
            this.toggleOmnibox();
        }, true);

        this.props.bindShortcut(['ctrl+b', 'command+b'], (e) => {
            e.preventDefault();
            this.toggleSidebar();
        }, true);

        this.props.bindShortcut(['ctrl+h', 'command+h'], (e) => {
            e.preventDefault();
            this.toggleHelpModal();
        }, true);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.settings.language !== this.props.settings.language) {
            this.loadTranslations(nextProps.settings.language);
        }
    }

    loadTranslations(language) {
        require.ensure([], require => {
            const viviMessages = require(`vivi/lib/messages/${language}`);
            const steinerMessages = require(`steiner/lib/messages/${language}`);
        // require([`vivi/lib/messages/${language}`, `steiner/lib/messages/${language}`], (viviMessages, messages) => {
            const translations = {
                ...viviMessages,
                steiner: steinerMessages.default.components
            };

            this.translations = translations;

            this.sidebarMenuLinks = routeRegister.getSidebarLinks(language);
            this.omniboxOptions = routeRegister.getOmniboxOptions(language);

            this.props.dispatch(setTranslations(steinerMessages.default));

            this.setState({
                isLanguageLoaded: true
            });
        });
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

    toggleHelpModal = () => {
        this.setState({
            isHelpModalOpen: ! this.state.isHelpModalOpen
        });
    }

    render() {
        const { user, currentRoute, dispatch } = this.props;

        return (
            <div>
            {/*<BrowserRouter>*/}
            <ControlledRouter
                history={history}
                location={currentRoute.location}
                action={currentRoute.action}
                dispatch={dispatch}
            >
                <div>
                    {!this.state.isLanguageLoaded && <div className="splash"><h1 className="loading dots">{process.env.REACT_APP_NAME} </h1></div>}
                    {this.state.isLanguageLoaded && <TranslatorProvider
                        locale={this.props.settings.language}
                        messages={this.translations}
                    >
                        <div>
                            <Helmet
                                titleTemplate={`${process.env.REACT_APP_NAME} | %s`}
                            >
                                <title>App</title>
                            </Helmet>
                            <ReactCSSTransitionGroup
                                transitionName="Omnibox__slide"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}
                            >
                                {this.state.isOmniboxOpen && <Omnibox key="omnibox" onChange={this.toggleOmnibox} options={this.omniboxOptions}/>}
                            </ReactCSSTransitionGroup>
                            <ModalHelp isOpen={this.state.isHelpModalOpen} onClose={this.toggleHelpModal} />
                            <LoadingBar style={{ zIndex: 3 }} updateTime={250} maxProgress={95} />
                            <Sidebar
                                sidebar={<SidebarMenu links={this.sidebarMenuLinks} onToggle={this.toggleSidebar}/>}
                                docked={this.state.isSidebarOpen}
                                transitions={false}
                            >
                                <div className={this.state.isSidebarOpen ? 'sidebar-is-open' : ''}>
                                    <Header
                                        isSidebarOpen={this.state.isSidebarOpen}
                                        onToggleSidebar={this.toggleSidebar}
                                        onToggleHelpModal={this.toggleHelpModal}
                                        user={user}
                                        routes={routes}
                                        dispatch={this.props.dispatch}
                                    />
                                    <div className="container-fluid">
                                        <Switch>
                                            <Route path="/" exact={true} render={() => <Welcome user={user}/>} />
                                            <MatchWhenGuest path="/login" exact={true} component={LoginForm} user={user} location={currentRoute.location} />
                                            <MatchWhenAuthorized user={user} path="/profile" component={Profile} />
                                            {routes.map((route, i) => (
                                                <MatchWhenAuthorizedAsync key={i} user={user} {...route} />
                                            ))}
                                        </Switch>
                                    </div>
                                </div>
                            </Sidebar>
                            <NotificationsSystem
                                theme={theme}
                            />
                        </div>
                    </TranslatorProvider>}
                </div>
            {/*</BrowserRouter>*/}
            </ControlledRouter>
            </div>
        );
    }
}

const KeyedApp = KeyBinderHoc(App);

function mapStateToProps(state) {
    return {
        user: getUser(state),
        currentRoute: getCurrentRoute(state),
        settings: getSettings(state)
    };
}

export default connect(mapStateToProps)(KeyedApp);