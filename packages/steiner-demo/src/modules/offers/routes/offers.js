import generateRoutes, { generateLinks } from 'steiner/dist/helpers/routeCreator';
import OffersListLayout from '../containers/OffersListLayout';
import OffersLoader from '../containers/OffersLoader';

const routes = generateRoutes('offers', {
    list: OffersListLayout,
    edit: OffersLoader
});

const links = generateLinks(routes.patterns);

export function linkTo(route, props) {
    return links[route](props);
}

export default routes.list;