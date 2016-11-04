import { routeCreator } from 'steiner';

import helper from 'helpers/steinerHelper';
import routeRegister from 'helpers/routeRegister';

import { selectors } from '../reducers/offers';

const routes = helper.generateRoutes('offers', selectors);
routes.list = routes.list.map(route => ({
    ...route,
    getComponent() {
        return new Promise((resolve, reject) => {
            require([`modules/offers/${route.componentPath}`], (RouteComponent) => {
                resolve(RouteComponent.default);
            });
        });
    },
}));

const links = routeCreator.generateLinks(routes.patterns);

routeRegister.addPatterns('offers', routes.patterns);
routeRegister.addLinks('offers', links);

export default routes.list;