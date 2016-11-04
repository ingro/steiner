import defaults from 'lodash/defaults';

const createReactSelectLoaderDefaultOptions = {
    limit: 20,
    labelKey: 'label',
    valueKey: 'value',
};

export function createReactSelectLoader(endpoint, client, options = {}) {
    defaults(options, createReactSelectLoaderDefaultOptions);

    return function(q) {
        return client.get(`/${endpoint}?_limit=${options.limit}&q=${q}`)
            .then(res => {
                const selectOptions = res.data.data.map(item => ({ value: item[options.valueKey], label: item[options.labelKey] }));
                return { options: selectOptions };
            });
    }
}
