import { routeCreator } from 'steiner';
import _ from 'lodash';

import helper from 'helpers/steinerHelper';
import routeRegister from 'helpers/routeRegister';
import { selectors } from '../reducers/alberghi';

const routes = helper.generateRoutes('alberghi', selectors);
const list = _.values(routes.list).map(route => ({
    ...route,
    getComponent() {
        return new Promise((resolve, reject) => {
            require.ensure([], require => {
                resolve(require(`modules/alberghi/${route.componentPath}`).default);
            });
        });
    },
}));

const links = routeCreator.generateLinks(routes.patterns);

routeRegister.addPatterns('alberghi', routes.patterns);
routeRegister.addLinks('alberghi', links);

export default list;