import { routeCreator } from 'steiner';
import _ from 'lodash';

import helper from 'helpers/steinerHelper';
import routeRegister from 'helpers/routeRegister';
import { selectors } from '../reducers/{{name}}';

const routes = helper.generateRoutes('{{name}}', selectors);
const list = _.values(routes.list).map(route => ({
    ...route,
    getComponent() {
        return new Promise(resolve => {
            import(/* webpackChunkName: '{{name}}' */ `modules/{{name}}/${route.componentPath}`)
                .then(response => resolve(response.default));
        });
    },
}));

const links = routeCreator.generateLinks(routes.patterns);

routeRegister.addPatterns('{{name}}', routes.patterns);
routeRegister.addLinks('{{name}}', links);

export default list;