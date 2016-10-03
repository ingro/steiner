import _ from 'lodash';

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
