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

routeRegister.addPatterns('hotels', routes.patterns);
routeRegister.addLinks('hotels', links);

export default routes.list;