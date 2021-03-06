import { routeCreator } from 'steiner';

import helper from 'helpers/steinerHelper';
import routeRegister from 'helpers/routeRegister';
import { selectors } from '../reducers/hotels';

const routes = helper.generateRoutes('hotels', selectors, {
    label: {
        it: 'Hotels',
        en: 'Hotels'
    }
});

const list = Object.values(routes.list).map(route => ({
    ...route,
    getComponent() {
        return new Promise(resolve => {
            import(/* webpackChunkName: 'hotels' */ `modules/hotels/${route.componentPath}`).then(
                response => resolve(response.default)
            );
        });
    }
}));

const links = routeCreator.generateLinks(routes.patterns);

routeRegister.addPatterns('hotels', routes.patterns, {
    it: 'Hotels',
    en: 'Hotels'
});

routeRegister.addLinks('hotels', links);

export default list;