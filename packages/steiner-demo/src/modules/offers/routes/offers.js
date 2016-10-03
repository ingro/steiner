import { routeCreator } from 'steiner';
import OffersListLayout from '../containers/OffersListLayout';
import OffersLoader from '../containers/OffersLoader';

const routes = routeCreator.generateRoutes('offers', {
    list: OffersListLayout,
    edit: OffersLoader
});

const links = routeCreator.generateLinks(routes.patterns);

export function linkTo(route, props) {
    return links[route](props);
}

export default routes.list;