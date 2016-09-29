import generateRoutes, { generateLinks } from 'steiner/dist/helpers/routeCreator';
import HotelsListLayout from '../containers/HotelsListLayout';
import HotelsLoader from '../containers/HotelsLoader';

const routes = generateRoutes('hotels', {
    list: HotelsListLayout,
    edit: HotelsLoader
});

const links = generateLinks(routes.patterns);

export function linkTo(route, props) {
    return links[route](props);
}

export default routes.list;