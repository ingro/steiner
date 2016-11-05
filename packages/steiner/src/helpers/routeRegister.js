import arrify from 'arrify';
import forOwn from 'lodash/forOwn';
import upperFirst from 'lodash/upperFirst';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';

export default class RouteRegister {
    constructor() {
        this.patterns = {};
        this.links = {};
        this.staticOptions = [];
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

    getOmniboxOptions() {
        let i = 1;

        const options = [];

        this.staticOptions.forEach(option => {
            options.push({
                ...option,
                id: i
            });

            i++;
        });

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

        return sortBy(options, 'label');
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