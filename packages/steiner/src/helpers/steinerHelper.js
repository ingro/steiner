import _ from 'lodash';

import { createActions, createActionTypes } from './actionCreator';
import createApi from './apiCreator';
import { createHandlers, DEFAULT_STATE } from './reducerCreator';
import { generateRoutes } from './routeCreator';
import { createSagas } from './sagaCreator';

/**
 * Options:
 * actionMessages: object, an object containing the message strings organized by language
 * defaultClient: axios instance used by default by apis call
 * paramsMap: object, the default paramsMap used by api's list request to filter it
 * listSuccessOptions: object, the default options for the listSuccess reducer to extract data and metadata from api's response
 * defaultPerPage: number, default number of items to show in tables
 */

export default class SteinerHelper {
    constructor(options = {}) {
        this.options = options;
    }

    getCreateSagasOptions(options) {
        if (typeof options === 'undefined') {
            options = {
                messages: this.options.actionMessages
            };
        }

        return options;
    }

    createActions(resource, actionTypes, options) {
        return createActions(resource, actionTypes, options);
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

    generateRoutes(resource, selectors, options) {
        return generateRoutes(resource, selectors, options);
    }

    createSagas(resource, actionTypes, actions, api, selectors, defaultState, options) {
        return createSagas(resource, actionTypes, actions, api, selectors, defaultState, this.getCreateSagasOptions(options));
    }

    createDefaultState(customState = {}) {
        if (typeof _.get(customState, 'list.filters.perPage') === 'undefined' && this.options.defaultPerPage) {
            _.set(customState, 'list.filters.perPage', this.options.defaultPerPage);
        }

        return DEFAULT_STATE.merge(customState, { deep: true });
    }
}