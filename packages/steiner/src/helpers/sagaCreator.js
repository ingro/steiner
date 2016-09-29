import { take, put, call, select, cancel, fork } from 'redux-saga/effects';
import { delay, takeLatest } from 'redux-saga';
import upperFirst from 'lodash/upperFirst';
import trim from 'lodash/trim';
import { addNotification as notify } from 'reapop';

function success(type, response) {
    return {
        type,
        payload: response
    };
}

function fail(type, response) {
    return {
        type,
        error: response
    };
}

function notifySuccess(message) {
    return notify({
        title: 'Hooray!',
        message,
        status: 'success'
    });
}

function notifyError(message) {
    return notify({
        title: 'Oh snap!',
        message,
        status: 'error'
    });
}

export function bootSagas(sagas, actionTypes) {
    return [
        takeLatest(actionTypes.list, sagas.list),
        fork(sagas.fetch),
        fork(sagas.create),
        fork(sagas.update),
        fork(sagas.delete),
        fork(sagas.filter)
    ];
}

export default function createSagas(resource, actions, api, selectors) {
    if (resource == null) {
        throw new Error('Expected resource');
    }

    resource = trim(upperFirst(resource));

    const sagas = {};

    sagas[`list`] = function*() {
        try {
            const filters = yield select(selectors.getFilters);
            const response = yield call(api.list, filters);

            yield put(success(actions.listSuccess, response));
        } catch(error) {
            yield put(fail(actions.listFail, error));
        }
    }

    Object.defineProperty(sagas[`list`], 'name', {
        value: `list${resource}`
    });

    sagas[`fetch`] = function*() {
        while (true) {
            try {
                const action = yield take(actions.fetch);

                const response = yield call(api.fetch, action.payload.id);

                yield put(success(actions.fetchSuccess, response));
            } catch(error) {
                yield put(fail(actions.fetchFail, error));
            }
        }
    }

    sagas[`create`] = function*() {
        while (true) {
            try {
                const action = yield take(actions.create);

                const response = yield call(api.create, action.payload);

                yield put(success(actions.createSuccess, response));
                yield put(notifySuccess(`${resource} created with success!`));
            } catch(error) {
                yield put(fail(actions.createFail, error));
                yield put(notifyError(`An error occured while creating ${resource}`));
            }
        }
    }

    sagas[`update`] = function*() {
        while (true) {
            const action = yield take(actions.update);

            try {
                const response = yield call(api.update, action.payload.id, action.payload);

                yield put(success(actions.updateSuccess, response));
                yield put(notifySuccess(`${resource} updated with success!`));
                // yield call(action.payload.resolve, response);
            } catch(error) {
                yield put(fail(actions.updateFail, error));
                yield put(notifyError(`An error occured while updating ${resource}`));
                // yield call(action.payload.reject, { _error: 'Fail' });
            }
        }
    }

    sagas[`delete`] = function*() {
        while (true) {
            try {
                const action = yield take(actions.delete);

                const response = yield call(api.delete, action.payload.id);

                yield put(success(actions.deleteSuccess, { response, id: action.payload.id }));
                yield put(notifySuccess(`${resource} deleted with success!`));
                // yield put({ type: actions.list });
            } catch(error) {
                yield put(fail(actions.deleteFail, error));
                yield put(notifyError(`An error occured while deleting ${resource}`));
            }
        }
    }

    function* handleFilter() {
        yield call(delay, 500);

        yield put({ type: actions.list });
    }

    sagas[`filter`] = function*() {
        let task;

        while (true) {
            yield take([actions.updateFilter, actions.changePage, actions.changeOrder]);

            if (task) {
                yield cancel(task);
            }

            task = yield fork(handleFilter);
        }
    }

    // sagas[`changePage`] = function*() {
    //     while (true) {
    //         yield take(actions.changePage);

    //         yield put({ type: actions.list });
    //     }
    // }

    // sagas['changeOrder'] = function*() {
    //     while (true) {
    //         yield take(actions.changeOrder);

    //         yield put({ type: actions.list });
    //     }
    // }

    return sagas;
}