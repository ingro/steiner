import { routeCreator } from 'steiner';
import ${ucName}ListLayout from '../containers/${ucName}ListLayout';
import ${ucName}Loader from '../containers/${ucName}Loader';

const routes = routeCreator.generateRoutes('${name}', {
    list: ${ucName}ListLayout,
    edit: ${ucName}Loader
});

const links = routeCreator.generateLinks(routes.patterns);

export function linkTo(route, props) {
    return links[route](props);
}

export default routes.list;