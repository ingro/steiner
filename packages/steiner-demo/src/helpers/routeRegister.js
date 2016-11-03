import _ from 'lodash';

class RouteRegister {
    constructor() {
        this.patterns = {};
        this.links = {};
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

    addLinks(key, links) {
        this.links[key] = links;
    }

    getLinksByKey(key) {
        return this.links[key];
    }

    getLinks() {
        return this.links;
    }

    getOmniboxOptions() {
        const options = [{
            id: 1,
            type: 'link',
            path: '/profile',
            label: 'Profile'
        }];
        
        let i = 2;

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

    getLinkTo(route, props) {
        const linkGenerator = _.get(this.links, route);

        return linkGenerator(props);
    }
}

const register = new RouteRegister();

export default register;