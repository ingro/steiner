import _ from 'lodash';

import { createActions, createActionTypes } from './actionCreator';
import createApi from './apiCreator';
import { createHandlers, DEFAULT_STATE } from './reducerCreator';
import { generateRoutes } from './routeCreator';

/**
 * Options:
 * lang: string, the current language of the application
 * actionMessages: object, an object containing the message strings organized by language
 * breacrumbLabels: object, an object containing the breadcrumb labels organized by language
 * defaultClient: axios instance used by default by apis call
 * paramsMap: object, the default paramsMap used by api's list request to filter it
 * listSuccessOptions: object, the default options for the listSuccess reducer to extract data and metadata from api's response
 * defaultPerPage: number, default number of items to show in tables
 */

export default class SteinerHelper {
    constructor(options = {}) {
        this.options = options;
    }

    getBreadcrumbOptions(options) {
        if (typeof options === 'undefined') {
            options = {
                breadcrumbs: this.options.breacrumbLabels
            };
        }

        return options;
    }

    getCreateActionsOptions(options) {
        if (typeof options === 'undefined') {
            options = {
                messages: this.options.actionMessages
            };
        }

        return options;
    }

    // setLanguage(language) {
    //     this.options.lang = language;
    // }

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

    generateRoutes(resource, selectors, options) {
        return generateRoutes(resource, selectors, this.getBreadcrumbOptions(options));
    }

    // createConfirmAction(options) {
    //     defaults(options, this.getConfirmDialogOptions());
    //     return createConfirm(options);
    // }

    createDefaultState(customState = {}) {
        if (typeof _.get(customState, 'list.filters.perPage') === 'undefined' && this.options.defaultPerPage) {
            _.set(customState, 'list.filters.perPage', this.options.defaultPerPage);
        }

        return DEFAULT_STATE.merge(customState, { deep: true });
    }
}