import { routeCreator } from 'steiner';
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

export default routes.list;