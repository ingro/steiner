import arrify from 'arrify';
import _ from 'lodash';

const defaultOptions = {
    actionTranslations: {}
};

export default class RouteRegister {
    constructor(options = {}) {
        _.defaults(options, defaultOptions);

        this.patterns = {};
        this.links = {};
        this.staticOptions = [];
        this.keyTranslations = {};
        this.actionTranslations = options.actionTranslations;
    }

    addPatterns(key, patterns, translations) {
        this.patterns[key] = patterns;

        if (translations) {
            this.keyTranslations[key] = translations;
        }
    }

    getPatternsByKey(key) {
        return this.patterns[key];
    }

    getPatterns() {
        return this.patterns;
    }

    addLinks(key, links) {
        this.links[key] = links;
    }

    addStaticOptions(options) {
        options = arrify(options);
        options.forEach(option => this.staticOptions.push(option));
    }

    getLinksByKey(key) {
        return this.links[key];
    }

    getLinks() {
        return this.links;
    }

    getOmniboxOptions(language) {
        let i = 1;

        const options = [];

        this.staticOptions.forEach(option => {
            options.push({
                ...option,
                id: i
            });

            i++;
        });

        const validActions = ['list', 'create'];

        _.forOwn(this.patterns, (patterns, key) => {
            _.forOwn(patterns, (path, action) => {
                if (_.includes(validActions, action)) {
                    options.push({
                        id: i,
                        type: 'link',
                        path,
                        label: `${this.getKeyLabel(key, language)}: ${this.getActionLabel(action, language)}`
                    });

                    i++;
                }
            });
        });

        return _.sortBy(options, 'label');
    }

    getKeyLabel(key, language) {
        if (this.keyTranslations[key]) {
            return this.keyTranslations[key][language];
        }

        return _.upperFirst(key);
    }

    getActionLabel(action, language) {
        if (this.actionTranslations[action]) {
            return this.actionTranslations[action][language];
        }

        return action;
    }

    getSidebarLinks(language) {
        const links = [];

        _.forOwn(this.patterns, (patterns, key) => {
            links.push({
                to: patterns['list'],
                name: this.getKeyLabel(key, language)
            });
        });

        return _.sortBy(links, 'name');
    }

    getLinkTo(route, props) {
        const linkGenerator = _.get(this.links, route);

        if (! linkGenerator) {
            return '';
        }

        return linkGenerator(props);
    }
}