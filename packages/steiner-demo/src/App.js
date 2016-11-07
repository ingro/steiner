import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Match } from 'react-router';
import NotificationsSystem from 'reapop';
import LoadingBar from 'react-redux-loading-bar';
import Sidebar from 'react-sidebar';
import Helmet from 'react-helmet';
import theme from 'reapop-theme-wybo';
import { ControlledRouter, MatchWhenAuthorizedAsync, MatchWhenGuest, KeyBinderHoc } from 'steiner';
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
import helper from './helpers/steinerHelper';

const sidebarMenuLinks = routeRegister.getSidebarLinks();
const omniboxOptions = routeRegister.getOmniboxOptions();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOmniboxOpen: false,
            isSidebarOpen: false,
            isHelpModalOpen: false,
            isLanguageLoaded: false
        };
    }

    componentDidMount() {
        const language = this.props.settings.language || process.env.REACT_APP_DEFAULT_LANGUAGE;

        require([`vivi/lib/messages/${language}`, `steiner/lib/messages/${language}`], (viviMessages, messages) => {
            const translations = {
                ...viviMessages,
                steiner: messages.default.components
            };

            this.translations = translations;

            this.props.dispatch(setTranslations(messages.default));

            helper.setLanguage(this.props.settings.language);

            this.setState({
                isLanguageLoaded: true
            });
        });

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
                                title="App"
                                titleTemplate={`${process.env.REACT_APP_NAME} | %s`}
                            />
                            <ReactCSSTransitionGroup
                                transitionName="Omnibox__slide"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}
                            >
                                {this.state.isOmniboxOpen && <Omnibox key="omnibox" onChange={this.toggleOmnibox} options={omniboxOptions}/>}
                            </ReactCSSTransitionGroup>
                            <ModalHelp isOpen={this.state.isHelpModalOpen} onClose={this.toggleHelpModal} />
                            <LoadingBar style={{ zIndex: 3 }} updateTime={250} maxProgress={95} />
                            <Sidebar
                                sidebar={<SidebarMenu links={sidebarMenuLinks} onToggle={this.toggleSidebar}/>}
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
                                        <Match pattern="/" exactly={true} render={() => <Welcome user={user}/>} />
                                        <MatchWhenGuest pattern="/login" exactly={true} component={LoginForm} user={user} location={currentRoute.location} />
                                        <Match pattern="/profile" render={() => <Profile user={user} />}/>
                                        {routes.map((route, i) => (
                                            <MatchWhenAuthorizedAsync key={i} user={user} {...route} />
                                        ))}
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
                    </TranslatorProvider>}
                </div>
            </ControlledRouter>
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