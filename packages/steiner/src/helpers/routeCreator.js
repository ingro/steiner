import pathToRegexp from 'path-to-regexp';
import _ from 'lodash';

import defaultMessages from '../messages/en';

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

export function generateRoutes(resource, components, selectors, options = {}) {
    const patterns = createPatterns(resource);

    _.defaults(options, {
        breadcrumbs: defaultMessages.messages.breadcrumbs
    });

    return {
        list: [
            {
                pattern: patterns.list,
                exactly: true,
                component: components.list,
                breadcrumb: _.upperFirst(resource)
            },
            {
                pattern: patterns.edit,
                component: components.edit,
                breadcrumb: (state, ownProps) => {
                    if (ownProps.params.id === 'create') {
                        return {
                            breadcrumbName: options.breadcrumbs.editNew
                        };
                    }

                    const current = selectors.currentSelector(state);

                    if (current && current.item) {
                        return {
                            breadcrumbName: current.item.name
                        };
                    }

                    return {};
                }
            }
        ],
        patterns
    };
}

export default {
    generateLinks,
    generateRoutes
};