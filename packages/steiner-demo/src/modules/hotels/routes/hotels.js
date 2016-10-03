import { routeCreator } from 'steiner';
import HotelsListLayout from '../containers/HotelsListLayout';
import HotelsLoader from '../containers/HotelsLoader';

const routes = routeCreator.generateRoutes('hotels', {
    list: HotelsListLayout,
    edit: HotelsLoader
});

const links = routeCreator.generateLinks(routes.patterns);

export function linkTo(route, props) {
    return links[route](props);
}

export default routes.list;