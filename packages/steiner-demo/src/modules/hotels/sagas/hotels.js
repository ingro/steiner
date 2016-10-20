import { sagaCreator } from 'steiner';
// import { take, put, call, select, cancel, fork } from 'redux-saga/effects';
// import { delay, takeLatest } from 'redux-saga';
// import _ from 'lodash';

import { actions, actionTypes } from '../actions/hotels';
import { selectors, DEFAULT_STATE } from '../reducers/hotels';
import api from '../apis/hotels';

const sagas = sagaCreator.createSagas('hotels', actionTypes, actions, api, selectors, DEFAULT_STATE);

// import qs from 'query-string';

// function* handleFilter() {
//     yield call(delay, 500);

//     yield put(actions.list());
// }

// sagas.filter = function*() {
//     let task;

//     while (true) {
//         const action = yield take([actionTypes.updateFilter, actionTypes.changePage, actionTypes.changeOrder]);

//         if (action.type !== actionTypes.syncFilters) {

//             const filters = yield select(selectors.getFilters);

//             const defaultFilters = DEFAULT_STATE.list.filters.asMutable();

//             // TODO: blacklist params???
//             // const diff = _.omit(_.omitBy(filters.asMutable(), (v, k) => defaultFilters[k] == v), blacklist);

//             const diff = _.omitBy(filters.asMutable(), (v, k) => defaultFilters[k] == v);

//             yield put({
//                 type: 'NAVIGATE',
//                 location: { 
//                     pathname: window.location.pathname, 
//                     search: `?${qs.stringify(diff)}`, 
//                     query: diff 
//                 },
//                 action: 'PUSH'
//             });
//         }

//         if (task) {
//             yield put({ type:'NOOP', loadingBar: 'hide' });
//             yield cancel(task);
//         }

//         task = yield fork(handleFilter);
//     }
// }

// sagas.sync = function*() {
//     while (true) {
//         yield take([actionTypes.syncFilters]);

//         yield put(actions.list());
//     }
// }

// sagas.checkSync = function*() {
//     while (true) {
//         const action = yield take('hotels/CHECK_SYNC');

//         const filters = action.payload;

//         _.defaults(filters, DEFAULT_STATE.list.filters.asMutable());

//         const currentState = yield select(selectors.getFilters);

//         // console.warn(filters);
//         // console.warn(currentState);

//         const diff = _.omitBy(filters, (v, k) => currentState[k] == v);

//         // console.warn(diff);

//         if (!_.isEmpty(diff)) {
//             yield put({
//                 type: actionTypes.syncFilters,
//                 payload: filters
//             });
//         }
//     }
// }

export default sagaCreator.bootSagas(sagas, actionTypes);

// export default [
//     takeLatest(actionTypes.list, sagas.list),
//     fork(sagas.fetch),
//     fork(sagas.create),
//     fork(sagas.update),
//     fork(sagas.delete),
//     fork(sagas.filter),
//     fork(sagas.checkSync),
//     fork(sagas.sync)
// ];