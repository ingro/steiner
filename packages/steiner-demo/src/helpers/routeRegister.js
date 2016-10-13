import _ from 'lodash';

class RouteRegister {
    constructor() {
        this.patterns = {};
    }

    addPatterns(key, patterns) {
        this.patterns[key] = patterns;
    }

    getPatternsByKey(key) {
        return this.patterns[key];
    }

    getPatterns() {
        return this.patterns;
    }

    getOmniboxOptions() {
        const options = [];
        let i = 1;

        const actions = ['list', 'create'];

        _.forOwn(this.patterns, (patterns, key) => {
            actions.forEach(action => {
                options.push({
                    id: i,
                    type: 'link',
                    path: patterns[action],
                    label: `${_.upperFirst(key)}: ${action}`
                });

                i++;
            });
        });

        return options;
    }

    getSidebarLinks() {
        const links = [];

        _.forOwn(this.patterns, (patterns, key) => {
            links.push({
                to: patterns['list'],
                name: _.upperFirst(key)
            });
        });

        return _.sortBy(links, 'name');
    }
}

const register = new RouteRegister();

export default register;