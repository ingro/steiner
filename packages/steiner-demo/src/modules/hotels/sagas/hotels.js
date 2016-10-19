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

sagas.filter = function*() {
    let task;

    while (true) {
        yield take([actionTypes.updateFilter, actionTypes.changePage, actionTypes.changeOrder]);

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
            location: { pathname:'/hotels', search: qs.stringify(diff), query: diff },
            action: 'REPLACE'
        });

        if (task) {
            yield cancel(task);
        }

        task = yield fork(handleFilter);
    }
}

export default sagaCreator.bootSagas(sagas, actionTypes);