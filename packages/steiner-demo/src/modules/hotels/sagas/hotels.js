import { sagaCreator } from 'steiner';
import { take, put, call, select, cancel, fork } from 'redux-saga/effects';
import { delay, takeLatest } from 'redux-saga';
import _ from 'lodash';

import { actions, actionTypes } from '../actions/hotels';
import { selectors, DEFAULT_STATE } from '../reducers/hotels';
import api from '../apis/hotels';

const sagas = sagaCreator.createSagas('hotels', actionTypes, actions, api, selectors);

import qs from 'query-string';

function* handleFilter() {
    yield call(delay, 500);

    yield put(actions.list());
}

let task;

sagas.filter = function*() {
    while (true) {
        const action = yield take([actionTypes.updateFilter, actionTypes.changePage, actionTypes.changeOrder, actionTypes.syncFilters]);

        if (action.type !== actionTypes.syncFilters) {

            const { q, page, perPage } = yield select(selectors.getFilters);

            const query = {
                q,
                page,
                perPage
            };

            const validFilterParameters = ['q', 'page', 'perPage'];

            const filters = DEFAULT_STATE.list.filters;

            const defaultState = {
                q: filters.q,
                page: filters.page,
                perPage: filters.perPage
            };

            const diff = _.pick(_.omitBy(query, (v, k) => defaultState[k] === v), validFilterParameters);

            yield put({
                type: 'NAVIGATE',
                location: { pathname:'/hotels', search: '?' + qs.stringify(diff), query: diff },
                action: 'PUSH'
            });
        }

        if (task) {
            yield put({ type:'NOOP', loadingBar: 'hide' });
            yield cancel(task);
        }

        task = yield fork(handleFilter);
    }
}

// sagas.sync = function*() {
//     while (true) {
//         yield take([actionTypes.syncFilters]);
//     }
// }

sagas.checkSync = function*() {
    while (true) {
        const action = yield take('hotels/CHECK_SYNC');

        const filters = action.payload;

        _.defaults(filters, DEFAULT_STATE.list.filters);

        // const validFilterParameters = ['q', 'page', 'perPage'];

        // const currentState = yield select(selectors.getFilters);

        // const diff = _.pick(_.omitBy(filters, (v, k) => currentState[k] === v), validFilterParameters);

        // const { q, page, perPage } = yield select(selectors.getFilters);

        // const payloadPage = action.payload.page || 1;

        yield put({
            type: actionTypes.syncFilters,
            payload: filters
        });

        // console.warn(payloadPage, page);

        // if (payloadPage !== page) {
            // console.warn('PAGE IS NOT THE SAME!');
            // if (task) {
            //     // yield put({ type: 'NOOP', loadingBar: 'hide' });
            //     yield cancel(task);
            // }

            // task = yield fork(handleFilter);
        // }   
    }
}

// export default sagaCreator.bootSagas(sagas, actionTypes);

export default [
    takeLatest(actionTypes.list, sagas.list),
    fork(sagas.fetch),
    fork(sagas.create),
    fork(sagas.update),
    fork(sagas.delete),
    fork(sagas.filter),
    fork(sagas.checkSync)
    // fork(sagas.sync)
];