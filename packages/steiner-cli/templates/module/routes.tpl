import { routeCreator } from 'steiner';

import routeRegister from 'helpers/routeRegister';
import {{name | title}}ListLayout from '../containers/{{name | title}}ListLayout';
import {{name | title}}Loader from '../containers/{{name | title}}Loader';
import { selectors } from '../reducers/{{name}}';

const routes = routeCreator.generateRoutes('{{name}}', {
    list: {{name | title}}ListLayout,
    edit: {{name | title}}Loader
}, selectors);

const links = routeCreator.generateLinks(routes.patterns);

routeRegister.addPatterns('{{name}}', routes.patterns);
routeRegister.addLinks('{{name}}', links);

export default routes.list;