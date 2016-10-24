import defaults from 'lodash/defaults';

import { createActions, createActionTypes } from './actionCreator';
import createApi from './apiCreator';
import { createHandlers } from './reducerCreator';
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

// const SteinerHelper = function(options = {}) {
//     this.options = options;

//     defaults(this.options, defaultOptions);
// };

// SteinerHelper.prototype.getCreateActionsOptions = function(options) {
//     if (typeof options === 'undefined') {
//         options = {
//             messages: this.options.actionMessages,
//             messageTemplates: this.getActionMessageTemplates(),
//             notificationTitles: this.getNotificationTitles()
//         };
//     } else {
//         options = {
//             messages: options.messages || this.options.actionMessages,
//             messageTemplates: options.messageTemplates || this.getActionMessageTemplates(),
//             notificationTitles: options.notificationTitles || this.getNotificationTitles()
//         };
//     }

//     return options;
// };

// SteinerHelper.prototype.getActionMessageTemplates = function () {
//     if (typeof this.options.actionMessageTemplates === 'undefined') {
//         return this.options.defaultMessages[this.options.lang].templates.actionMessages;
//     }

//     return this.options.actionMessageTemplates;
// };

// SteinerHelper.prototype.getNotificationTitles = function () {
//     if (typeof this.options.notificationTitles === 'undefined') {
//         return this.options.defaultMessages[this.options.lang].messages.notifications.titles;
//     }

//     return this.options.notificationTitles;
// };

// SteinerHelper.prototype.getBreadcrumbOptions = function() {
//     if (typeof this.options.breadcrumbOptions === 'undefined') {
//         return this.options.defaultMessages[this.options.lang].messages.breadcrumbs;
//     }

//     return this.options.breadcrumbOptions;
// };

// SteinerHelper.prototype.getConfirmDialogOptions = function() {
//     return defaults(this.options.confirmDialogOptions || {}, this.options.defaultMessages[this.options.lang].messages.confirmDialog);
// };

// export default SteinerHelper;

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
}