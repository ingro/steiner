import defaults from 'lodash/defaults';
import get from 'lodash/get';
import set from 'lodash/set';

import { createActions, createActionTypes } from './actionCreator';
import createApi from './apiCreator';
import { createHandlers, DEFAULT_STATE } from './reducerCreator';
import { generateRoutes } from './routeCreator';
import createConfirm from './confirmCreator';

import enMessages from '../messages/en';
import itMessages from '../messages/it';

const defaultOptions = {
    lang: 'en',
    defaultMessages: {
        en: enMessages,
        it: itMessages
    }
};

export default class SteinerHelper {
    constructor(options = {}) {
        this.options = options;

        defaults(this.options, defaultOptions);
    }

    getActionMessageTemplates() {
        if (typeof this.options.actionMessageTemplates === 'undefined') {
            return this.options.defaultMessages[this.options.lang].templates.actionMessages;
        }

        return this.options.actionMessageTemplates;
    }

    getNotificationTitles() {
        if (typeof this.options.notificationTitles === 'undefined') {
            return this.options.defaultMessages[this.options.lang].messages.notifications.titles;
        }

        return this.options.notificationTitles;
    }

    getBreadcrumbOptions() {
        if (typeof this.options.breadcrumbOptions === 'undefined') {
            return this.options.defaultMessages[this.options.lang].messages.breadcrumbs;
        }

        return this.options.breadcrumbOptions;
    }

    getConfirmDialogOptions() {
        return defaults(this.options.confirmDialogOptions || {}, this.options.defaultMessages[this.options.lang].messages.confirmDialog);
    }

    getCreateActionsOptions(options) {
        if (typeof options === 'undefined') {
            options = {
                messages: this.options.actionMessages,
                messageTemplates: this.getActionMessageTemplates(),
                notificationTitles: this.getNotificationTitles()
            };
        } else {
            options = {
                messages: options.messages || this.options.actionMessages,
                messageTemplates: options.messageTemplates || this.getActionMessageTemplates(),
                notificationTitles: options.notificationTitles || this.getNotificationTitles()
            };
        }

        return options;
    }

    setLanguage(language) {
        this.options.lang = language;
    }

    createActions(resource, actionTypes, options) {
        return createActions(resource, actionTypes, this.getCreateActionsOptions(options));
    }

    createActionTypes(resource, options) {
        return createActionTypes(resource, options);
    }

    createApi(endpoint, client, paramsMap) {
        client = client || this.options.defaultClient;
        paramsMap = paramsMap || this.options.paramsMap;

        return createApi(endpoint, client, paramsMap);
    }

    createHandlers(actionTypes, options) {
        options = options || this.options.listSuccessOptions;

        return createHandlers(actionTypes, options);
    }

    generateRoutes(resource, components, selectors, options) {
        options = options || { 
            breadcrumbs: this.getBreadcrumbOptions() 
        };

        return generateRoutes(resource, components, selectors, options);
    }

    createConfirmAction(options) {
        defaults(options, this.getConfirmDialogOptions());
        return createConfirm(options);
    }

    createDefaultState(customState = {}) {
        if (typeof get(customState, 'list.filters.perPage') === 'undefined' && this.options.defaultPerPage) {
            set(customState, 'list.filters.perPage', this.options.defaultPerPage);
        }

        return DEFAULT_STATE.merge(customState, { deep: true });
    }
}