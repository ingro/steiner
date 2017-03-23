import _ from 'lodash';

export const DEFAULT_PARAMS_MAP = {
    q: 'q',
    _page: 'page',
    _limit: 'perPage',
    _sort: 'orderKey',
    _order: 'orderDirection'
};

export function buildParams(filters, paramsMap = {}) {
    const params = {};

    _.defaults(paramsMap, DEFAULT_PARAMS_MAP);

    _.forOwn(paramsMap, (value, key) => {
        if (typeof value === 'function') {
            params[key] = value(filters);
        } else if (key !== '') {
            params[key] = _.get(filters, value);
        }
    });

    return params;
}

const defaultOptions = {
    omit: []
};

export default function createApi(endpoint, client, paramsMap = {}, options = {}) {
    _.defaults(options, defaultOptions);
    const routes = {};

    const [uri, qs] = endpoint.split('?');

    routes.fetch = function(id) {
        return client({
            url: `/${uri}/${id}${qs ? '?' + qs : ''}`
        });
    }

    routes.list = function(filters) {
        return client({
            url: `/${uri}${qs ? '?' + qs : ''}`,
            params: buildParams(filters, paramsMap)
        });
    }

    routes.create = function(data) {
        return client({
            url: `/${uri}`,
            method: 'post',
            data
        });
    }

    routes.update = function(id, data) {
        return client({
            url: `/${uri}/${id}`,
            method: 'patch',
            data
        });
    }

    routes.delete = function(id) {
        return client({
            url: `/${uri}/${id}`,
            method: 'delete'
        });
    }

    return _.omit(routes, options.omit);
}