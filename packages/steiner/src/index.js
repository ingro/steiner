import authModule from './auth';

export * from './components';
export * from './helpers';
export const auth = authModule;

import { createActions } from './helpers/actionCreator';
import createApi from './helpers/apiCreator';
import { createHandlers } from './helpers/reducerCreator';

export default class SteinerHelper {
    constructor(options = {}) {
        this.options = options;
    }

    getCreateActionsOptions(options) {
        if (typeof options === 'undefined') {
            options = {
                messages: this.options.actionMessages,
                messageTemplates: this.options.actionMessageTemplates
            };
        } else {
            options = {
                messages: options.messages || this.options.actionMessages,
                messageTemplates: options.messageTemplates || this.options.actionMessageTemplates
            };
        }

        return options;
    }

    createActions(resource, actionTypes, options) {
        return createActions(resource, actionTypes, this.getCreateActionsOptions(options));
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
}