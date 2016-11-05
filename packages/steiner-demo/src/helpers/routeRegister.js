import forOwn from 'lodash/forOwn';
import upperFirst from 'lodash/upperFirst';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';

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

        forOwn(this.patterns, (patterns, key) => {
            actions.forEach(action => {
                options.push({
                    id: i,
                    type: 'link',
                    path: patterns[action],
                    label: `${upperFirst(key)}: ${action}`
                });

                i++;
            });
        });

        return options;
    }

    getSidebarLinks() {
        const links = [];

        forOwn(this.patterns, (patterns, key) => {
            links.push({
                to: patterns['list'],
                name: upperFirst(key)
            });
        });

        return sortBy(links, 'name');
    }

    getLinkTo(route, props) {
        const linkGenerator = get(this.links, route);

        return linkGenerator(props);
    }
}

const register = new RouteRegister();

export default register;