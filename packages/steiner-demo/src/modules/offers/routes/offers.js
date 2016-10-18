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

routeRegister.addPatterns('offers', routes.patterns);
routeRegister.addLinks('offers', links);

export default routes.list;