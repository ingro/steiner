import { take, put, call, select, cancel, fork } from 'redux-saga/effects';
import { delay, takeLatest } from 'redux-saga';
import upperFirst from 'lodash/upperFirst';
import trim from 'lodash/trim';
import omitBy from 'lodash/omitBy';
import defaults from 'lodash/defaults';
import isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';

import { navigate } from '../routing/actions';

function success(type, response, loadingBar) {
    const action = {
        type,
        payload: response
    };

    if (loadingBar) {
        action.loadingBar = loadingBar;
    }

    return action;
}

function fail(type, response, loadingBar) {
    const action = {
        type,
        error: response
    };

    if (loadingBar) {
        action.loadingBar = loadingBar;
    }

    return action;
}

export function bootSagas(sagas, actionTypes) {
    return [
        takeLatest(actionTypes.list, sagas.list),
        fork(sagas.fetch),
        fork(sagas.create),
        fork(sagas.update),
        fork(sagas.delete),
        fork(sagas.filter),
        fork(sagas.syncFilters),
        fork(sagas.checkFilterSync),
        fork(sagas.resetFilters)
    ];
}

export function createSagas(resource, actionTypes, actions, api, selectors, defaultState) {
    if (resource == null) {
        throw new Error('Expected resource');
    }

    resource = trim(upperFirst(resource));

    const sagas = {};

    sagas[`list`] = function*() {
        try {
            const filters = yield select(selectors.getFilters);
            const response = yield call(api.list, filters);

            yield put(success(actionTypes.listSuccess, response, 'hide'));
        } catch(error) {
            yield put(fail(actionTypes.listFail, error, 'hide'));
        }
    }

    Object.defineProperty(sagas[`list`], 'name', {
        value: `list${resource}`
    });

    sagas[`fetch`] = function*() {
        while (true) {
            try {
                const action = yield take(actionTypes.fetch);

                const response = yield call(api.fetch, action.payload.id);

                yield put(success(actionTypes.fetchSuccess, response));
            } catch(error) {
                yield put(fail(actionTypes.fetchFail, error));
            }
        }
    }

    sagas[`create`] = function*() {
        while (true) {
            try {
                const action = yield take(actionTypes.create);

                const response = yield call(api.create, action.payload);

                yield put(actions.createSuccess(response));
            } catch(error) {
                yield put(actions.createFail(error));
            }
        }
    }

    sagas[`update`] = function*() {
        while (true) {
            const action = yield take(actionTypes.update);

            try {
                const response = yield call(api.update, action.payload.id, action.payload);

                yield put(actions.updateSuccess(response));
            } catch(error) {
                yield put(actions.updateFail(error));
            }
        }
    }

    sagas[`delete`] = function*() {
        while (true) {
            try {
                const action = yield take(actionTypes.delete);

                const response = yield call(api.delete, action.payload.id);

                yield put(actions.deleteSuccess({ response, id: action.payload.id }));
            } catch(error) {
                yield put(actions.deleteFail(error));
            }
        }
    }

    function* handleFilter() {
        yield call(delay, 100);

        yield put(actions.list());
    }

    function getDiff(src, matchers) {
        return omitBy(src, (v, k) => matchers[k] == v);
    }

    sagas[`filter`] = function*() {
        let task;

        while (true) {
            yield take([actionTypes.updateFilter, actionTypes.changePage, actionTypes.changeOrder]);

            const filters = yield select(selectors.getFilters);

            const defaultFilters = defaultState.list.filters.asMutable();

            // TODO: blacklist params???
            // const diff = _.omit(_.omitBy(filters.asMutable(), (v, k) => defaultFilters[k] == v), blacklist);

            const diff = getDiff(filters.asMutable(), defaultFilters);

            const location = { 
                pathname: window.location.pathname, 
                search: `?${queryString.stringify(diff)}`, 
                query: diff 
            };

            yield put(navigate(location, 'PUSH'));

            if (task) {
                yield put({ type:'NOOP', loadingBar: 'hide' });
                yield cancel(task);
            }

            task = yield fork(handleFilter);
        }
    }

    sagas['syncFilters'] = function*() {
        while (true) {
            const action = yield take(actionTypes.syncFilters);

            if (isEmpty(action.payload)) {
                yield put(actions.resetFilters());
            } else {
                yield put(actions.setFilters(action.payload));
            }

            yield put(actions.list());
        }
    }

    sagas['checkFilterSync'] = function*() {
        while (true) {
            const action = yield take(actionTypes.checkFilterSync);

            const filters = action.payload;

            defaults(filters, defaultState.list.filters.asMutable());

            const currentState = yield select(selectors.getFilters);

            // console.warn(filters);
            // console.warn(currentState);

            const diff = getDiff(filters, currentState);

            // console.warn(diff);

            if (! isEmpty(diff)) {
                yield put(actions.syncFilters(filters));
            }
        }
    }

    sagas['resetFilters'] = function*() {
        while (true) {
            yield take(actionTypes.resetFilters);

            const filters = defaultState.list.filters.asMutable();

            yield put(actions.setFilters(filters));
        }
    }

    return sagas;
}

export default {
    createSagas,
    bootSagas
};