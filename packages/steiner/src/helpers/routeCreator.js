import pathToRegexp from 'path-to-regexp';
import _ from 'lodash';

import { getTranslations, getLanguage } from '../settings/reducer';

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

function getCreateLabel(options, state) {
    if (options.breadcrumbs) {
        const language = getLanguage(state);

        return options.breadcrumbs[language].editNew;
    }

    const translations = getTranslations(state);

    return translations.messages.breadcrumbs.editNew;
}

export function generateRoutes(resource, selectors, options = {}) {
    const patterns = createPatterns(resource);

    return {
        list: [
            {
                pattern: patterns.list,
                exactly: true,
                componentPath: `containers/${_.upperFirst(resource)}ListLayout`,
                breadcrumb: _.upperFirst(resource)
            },
            {
                pattern: patterns.edit,
                componentPath: `containers/${_.upperFirst(resource)}Loader`,
                breadcrumb: (state, ownProps) => {
                    if (ownProps.params.id === 'create') {
                        return {
                            breadcrumbName: getCreateLabel(options, state)
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