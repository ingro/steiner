import { sagaCreator } from 'steiner';

import { actions, actionTypes } from '../actions/offers';
import { selectors, DEFAULT_STATE } from '../reducers/offers';
import api from '../apis/offers';

const sagas = sagaCreator.createSagas('offers', actionTypes, actions, api, selectors, DEFAULT_STATE, {
    clientFilters: true,
    numberFilters: ['hotelsId', 'priceMin', 'priceMax']
});

// function getDiff(src, matchers) {
//     return _.omitBy(src, (v, k) => matchers[k] === v);
// }

// const intFilters = ['hotelsId', 'priceMin', 'priceMax'];

// sagas['syncFilters'] = function*(action) {
//     if (_.isEmpty(action.payload)) {
//         yield put(actions.resetFilters());
//     } else {
//         const filters = {};

//         _.forOwn(action.payload, (value, key) => {
//             filters[key] = _.includes(intFilters, key) ? parseInt(value, 10) : value;
//         });

//         yield put(actions.setFilters(filters));
//     }

//     yield put(actions.filterCollection());
// }

// sagas['filter'] = function*() {
//     const filters = yield select(selectors.getFilters);

//     const defaultFilters = DEFAULT_STATE.list.filters.asMutable();

//     const diff = getDiff(filters.asMutable(), defaultFilters);

//     // console.warn(diff);

//     const location = { 
//         pathname: window.location.pathname, 
//         search: `?${queryString.stringify(diff)}`, 
//         query: diff 
//     };

//     yield put(routing.actions.navigate(location, 'PUSH'));

//     yield put(actions.filterCollection());
// }

// function *doFilter() {
//     yield put(actions.filterCollection());
// }

const defaultSagas = sagaCreator.bootSagas(sagas, actionTypes);

export default [
    ...defaultSagas,
    // takeEvery(actionTypes.listSuccess, doFilter)
];