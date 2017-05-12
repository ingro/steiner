import pathToRegexp from 'path-to-regexp';
import _ from 'lodash';

import { getTranslations, getLanguage } from '../settings/reducer';

function createPatterns(resource, omit) {
    const patterns = {
        list: `/${resource}`,
        edit: `/${resource}/:id`,
        create: `/${resource}/create`
    };

    return _.omit(patterns, omit);
}

function createList(resource, patterns, selectors, options) {
    const list = {
        list: {
            path: patterns.list,
            exact: true,
            componentPath: `containers/${_.upperFirst(resource)}ListLayout`,
            breadcrumb: options.label ? (state) => {
                const language = getLanguage(state);

                return {
                    breadcrumbName: options.label[language]
                };
            } : _.upperFirst(resource)
        },
        edit: {
            path: patterns.edit,
            componentPath: `containers/${_.upperFirst(resource)}Loader`,
            breadcrumb: (state, ownProps) => {
                if (ownProps.match.params.id === 'create') {
                    return {
                        breadcrumbName: getCreateLabel(options, state)
                    };
                }

                const current = selectors.currentSelector(state);

                if (current && current.item) {
                    return {
                        breadcrumbName: _.get(current.item, options.itemLabelKey)
                    };
                }

                const item = selectors.itemSelector(state, ownProps.match.params.id);

                if (item) {
                    return {
                        breadcrumbName: _.get(item, options.itemLabelKey)
                    };   
                }

                return {
                    breadcrumbName: '...'
                };
            }
        }
    };

    return _.omit(list, options.omit);
}

export function generateLinks(patterns) {
    const links = {};

    _.forOwn(patterns, (pattern, key) => {
        links[key] = pathToRegexp.compile(pattern);
    });

    return links;
}

function getCreateLabel(options, state) {
    if (options.breadcrumbs) {
        const language = getLanguage(state);

        return options.breadcrumbs[language].editNew;
    }

    const translations = getTranslations(state);

    return translations.messages.breadcrumbs.editNew;
}

const generateRouteOptionsDefaults = {
    itemLabelKey: 'name',
    omit: []
};

export function generateRoutes(resource, selectors, options = {}) {
    _.defaults(options, generateRouteOptionsDefaults);

    const patterns = createPatterns(resource, options.omit);
    const list = createList(resource, patterns, selectors, options);

    return {
        list,
        patterns
    };
}

export default {
    generateLinks,
    generateRoutes
};