import { routeCreator } from 'steiner';

import routeRegister from 'helpers/routeRegister';
import HotelsListLayout from '../containers/HotelsListLayout';
import HotelsLoader from '../containers/HotelsLoader';
import { selectors } from '../reducers/hotels';

const routes = routeCreator.generateRoutes('hotels', {
    list: HotelsListLayout,
    edit: HotelsLoader
}, selectors);

const links = routeCreator.generateLinks(routes.patterns);

export function linkTo(route, props) {
    return links[route](props);
}

routeRegister.addPatterns('hotels', routes.patterns);

export default routes.list;