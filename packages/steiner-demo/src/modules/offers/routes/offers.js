import { routeCreator } from 'steiner';

import routeRegister from 'helpers/routeRegister';
import OffersListLayout from '../containers/OffersListLayout';
import OffersLoader from '../containers/OffersLoader';
import { selectors } from '../reducers/offers';

const routes = routeCreator.generateRoutes('offers', {
    list: OffersListLayout,
    edit: OffersLoader
}, selectors);

const links = routeCreator.generateLinks(routes.patterns);

export function linkTo(route, props) {
    return links[route](props);
}

routeRegister.addPatterns('offers', routes.patterns);

export default routes.list;