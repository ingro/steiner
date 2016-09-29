import pathToRegexp from 'path-to-regexp';
import _ from 'lodash';

function createPatterns(resource) {
    return {
        list: `/${resource}`,
        edit: `/${resource}/:id`,
        create: `/${resource}/create`
    };
}

export function generateLinks(patterns) {
    const links = {};

    _.forOwn(patterns, (pattern, key) => {
        links[key] = pathToRegexp.compile(pattern);
    });

    return links;
}

export default function generateRoutes(resource, components = {}) {
    const patterns = createPatterns(resource);

    return {
        list: [
            {
                pattern: patterns.list,
                exactly: true,
                component: components.list
            },
            {
                pattern: patterns.edit,
                component: components.edit
            }
        ],
        patterns
    };
}