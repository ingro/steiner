import { routeCreator } from 'steiner';

import {{name | title}}ListLayout from '../containers/{{name | title}}ListLayout';
import {{name | title}}Loader from '../containers/{{name | title}}Loader';
import { selectors } from '../reducers/{{name}}';

const routes = routeCreator.generateRoutes('{{name}}', {
    list: {{name | title}}ListLayout,
    edit: {{name | title}}Loader
}, selectors);

const links = routeCreator.generateLinks(routes.patterns);

export function linkTo(route, props) {
    return links[route](props);
}

export default routes.list;