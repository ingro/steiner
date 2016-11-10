import defaults from 'lodash/defaults';
import get from 'lodash/get';
import set from 'lodash/set';

import { createActions, createActionTypes } from './actionCreator';
import createApi from './apiCreator';
import { createHandlers, DEFAULT_STATE } from './reducerCreator';
import { generateRoutes } from './routeCreator';
import createConfirm from './confirmCreator';

import enMessages from '../messages/en';

const defaultOptions = {
    lang: 'en',
    defaultMessages: {
        en: enMessages,
    }
};

/**
 * Options:
 * lang: string, the current language of the application
 * defaultMessages: object, an object containing the default translated messages organized by language
 * actionMessages: object, an object containing just the message strings organized by language
 * actionMessageTemplates: object, an object containing just the message templates organized by language
 * notificationTitles: object, an object containing just the notification titles organized by language
 * breadcrumbOptions: object, an object containing just the breadcrumb strings organized by language
 * confirmDialogOptions: object, an object containing just the confirm dialog strings organized by language
 * defaultClient: axios instance used by default by apis call
 * paramsMap: object, the default paramsMap used by api's list request to filter it
 * listSuccessOptions: object, the default options for the listSuccess reducer to extract data and metadata from api's response
 * defaultPerPage: number, default number of items to show in tables
 */

export default class SteinerHelper {
    constructor(options = {}) {
        this.options = options;

        defaults(this.options, defaultOptions);
    }

    getActionMessageTemplates() {
        if (typeof this.options.actionMessageTemplates === 'undefined') {
            return this.options.defaultMessages[this.options.lang].templates.actionMessages;
        }

        return this.options.actionMessageTemplates[this.options.lang];
    }

    getNotificationTitles() {
        if (typeof this.options.notificationTitles === 'undefined') {
            return this.options.defaultMessages[this.options.lang].messages.notifications.titles;
        }

        return this.options.notificationTitles[this.options.lang];
    }

    getBreadcrumbOptions() {
        if (typeof this.options.breadcrumbOptions === 'undefined') {
            return this.options.defaultMessages[this.options.lang].messages.breadcrumbs;
        }

        return this.options.breadcrumbOptions[this.options.lang];
    }

    getConfirmDialogOptions() {
        // ??
        return defaults(this.options.confirmDialogOptions || {}, this.options.defaultMessages[this.options.lang].messages.confirmDialog);
    }

    getCreateActionsOptions(options) {
        if (typeof options === 'undefined') {
            options = {
                messages: get(this.options.actionMessages, this.options.lang),
                messageTemplates: this.getActionMessageTemplates(),
                notificationTitles: this.getNotificationTitles()
            };
        } else {
            options = {
                messages: options.messages || get(this.options.actionMessages, this.options.lang),
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