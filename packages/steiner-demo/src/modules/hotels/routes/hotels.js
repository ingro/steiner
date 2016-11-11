import { routeCreator } from 'steiner';

import helper from 'helpers/steinerHelper';
import routeRegister from 'helpers/routeRegister';
import { selectors } from '../reducers/hotels';

const routes = helper.generateRoutes('hotels', selectors, {
    label: {
        it: 'Alberghi',
        en: 'Hotels'
    }
});

routes.list = routes.list.map(route => ({
    ...route,
    getComponent() {
        return new Promise((resolve, reject) => {
            require([`modules/hotels/${route.componentPath}`], (RouteComponent) => {
                resolve(RouteComponent.default);
            });
        });
    },
}));

const links = routeCreator.generateLinks(routes.patterns);

routeRegister.addPatterns('hotels', routes.patterns, {
    it: 'Alberghi',
    en: 'Hotels'
});

routeRegister.addLinks('hotels', links);

export default routes.list;