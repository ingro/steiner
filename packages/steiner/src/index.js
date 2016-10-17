import authModule from './auth';

export * from './components';
export * from './helpers';
export const auth = authModule;

import createApi from './helpers/apiCreator';
import { createHandlers } from './helpers/reducerCreator';

export default class SteinerHelper {
    constructor(options = {}) {
        this.options = options;
    }

    createApi(endpoint, client, paramsMap) {
        client = client || this.options.defaultClient;
        paramsMap = paramsMap || this.options.paramsMap;

        return createApi(endpoint, client, paramsMap);
    }

    createHandlers(actionTypes, options) {
        options = this.options.listSuccessOptions || options;

        return createHandlers(actionTypes, options);
    }
}