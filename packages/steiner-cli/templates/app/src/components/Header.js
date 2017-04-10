import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { auth, confirm } from 'steiner';
import Dropdown from 'vivi/lib/Dropdown';
import TranslatorHoc from 'vivi/lib/TranslatorHoc';

import SidebarToggle from './SidebarToggle';
import Breadcrumb from './Breadcrumb';
import HeaderLink from './HeaderLink';

export class Header extends Component {
    requestLogout = (e) => {
        e.preventDefault();

        this.props.dispatch(confirm.actions.showConfirmDialog({
            message: this.props.logoutMessage,
            onSuccess: () => this.props.dispatch(auth.actions.logoutRequest())
        }));
    }

    toggleHelpModal = (e) => {
        e.preventDefault();

        this.props.onToggleHelpModal();
    }

    render() {
        const { helpLabel, isSidebarOpen, onToggleSidebar, profileAndSettingsLabel, routes, user } = this.props;

        return (
            <div className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        {! isSidebarOpen &&
                            <SidebarToggle position="navbar" onClick={onToggleSidebar} />
                        }
                        <Link className="navbar-brand" to="/">{process.env.REACT_APP_NAME}</Link>
                        <Breadcrumb routes={routes}/>
                    </div>
                    <div className="collapse navbar-collapse">
                        {/*<ul className="nav navbar-nav">
                            <HeaderLink to="/posts" name="Potels" />
                        </ul>*/}
                        <ul className="nav navbar-nav navbar-right">
                            {user
                                ?
                                <Dropdown
                                    text={<i className="fa fa-cog" />}
                                    type="navbar"
                                    right={true}
                                >
                                    <li className="dropdown-header">{user.email}</li>
                                    <li><Link to="/profile"><i className="fa fa-user"/> {profileAndSettingsLabel}</Link></li>
                                    <li><a href onClick={this.toggleHelpModal}><i className="fa fa-question"/> {helpLabel}</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href onClick={this.requestLogout}><i className="fa fa-sign-out"/> Logout</a></li>
                                </Dropdown>
                                : <HeaderLink to="/login" text="Login" />
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    dispatch: PropTypes.func,
    helpLabel: PropTypes.string,
    isSidebarOpen: PropTypes.bool,
    logoutMessage: PropTypes.string,
    onToggleHelpModal: PropTypes.func,
    onToggleSidebar: PropTypes.func,
    profileAndSettingsLabel: PropTypes.string,
    routes: PropTypes.array,
    user: PropTypes.object
};

Header.defaultProps = {
    helpLabel: 'Help',
    logoutMessage: 'Are you really want to exit from the application?',
    profileAndSettingsLabel: 'Profile & Settings'
};

export default TranslatorHoc(Header, {
    helpLabel: 'steiner.labels.help',
    logoutMessage: 'steiner.messages.confirmLogout',
    profileAndSettingsLabel: 'steiner.labels.profileAndSettings'
});