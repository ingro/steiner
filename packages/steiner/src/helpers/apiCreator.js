import _ from 'lodash';

export const DEFAULT_PARAMS_MAP = {
    q: 'q',
    _page: 'page',
    _limit: 'perPage',
    _sort: 'order.key',
    _order: 'order.direction'
};

function buildParams(filters, paramsMap = {}) {
    const params = {};

    _.defaults(paramsMap, DEFAULT_PARAMS_MAP);

    _.forOwn(paramsMap, (value, key) => {
        if (typeof value === 'function') {
            params[key] = value(filters);
        } else {
            params[key] = _.get(filters, value);
        }
    });

    return params;
}

const createReactSelectLoaderDefaultOptions = {
    limit: 20
};

export function createReactSelectLoader(endpoint, client, options = {}) {
    _.defaults(options, createReactSelectLoaderDefaultOptions);

    return function(q) {
        return client.get(`/${endpoint}?_limit=${options.limit}&q=${q}`)
            .then(res => {
                return { options: res.data.data };
            });
    }
}

export default function createApi(endpoint, client, paramsMap = {}) {
    const routes = {};

    routes.fetch = function(id) {
        return client({
            url: `/${endpoint}/${id}`
        });
    }

    routes.list = function(filters) {
        return client({
            url: `/${endpoint}`,
            params: buildParams(filters, paramsMap)
        });
    }

    routes.create = function(data) {
        return client({
            url: `/${endpoint}`,
            method: 'post',
            data
        });
    }

    routes.update = function(id, data) {
        return client({
            url: `/${endpoint}/${id}`,
            method: 'patch',
            data
        });
    }

    routes.delete = function(id) {
        return client({
            url: `/${endpoint}/${id}`,
            method: 'delete'
        });
    }

    return routes;
}