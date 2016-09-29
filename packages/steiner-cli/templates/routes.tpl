import generateRoutes, { generateLinks } from 'steiner/dist/helpers/routeCreator';
import ${ucName}ListLayout from '../containers/${ucName}ListLayout';
import ${ucName}Loader from '../containers/${ucName}Loader';

const routes = generateRoutes('${name}', {
    list: ${ucName}ListLayout,
    edit: ${ucName}Loader
});

const links = generateLinks(routes.patterns);

export function linkTo(route, props) {
    return links[route](props);
}

export default routes.list;