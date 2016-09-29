import { take, put, call, select, cancel, fork } from 'redux-saga/effects';
import { delay, takeLatest } from 'redux-saga';
import upperFirst from 'lodash/upperFirst';
import trim from 'lodash/trim';
// import { addNotification as notify } from 'reapop';

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

// function notifySuccess(message) {
//     return notify({
//         title: 'Hooray!',
//         message,
//         status: 'success'
//     });
// }

// function notifyError(message) {
//     return notify({
//         title: 'Oh snap!',
//         message,
//         status: 'error'
//     });
// }

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

export default function createSagas(resource, actionTypes, actions, api, selectors) {
    if (resource == null) {
        throw new Error('Expected resource');
    }

    resource = trim(upperFirst(resource));

    const sagas = {};

    sagas[`list`] = function*() {
        try {
            const filters = yield select(selectors.getFilters);
            const response = yield call(api.list, filters);

            yield put(success(actionTypes.listSuccess, response));
        } catch(error) {
            yield put(fail(actionTypes.listFail, error));
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
                // yield put(success(actionTypes.createSuccess, response));
                // yield put(notifySuccess(`${resource} created with success!`));
            } catch(error) {
                yield put(actions.createFail(error));
                // yield put(fail(actionTypes.createFail, error));
                // yield put(notifyError(`An error occured while creating ${resource}`));
            }
        }
    }

    sagas[`update`] = function*() {
        while (true) {
            const action = yield take(actionTypes.update);

            try {
                const response = yield call(api.update, action.payload.id, action.payload);

                yield put(actions.updateSuccess(response));
                // yield put(success(actionTypes.updateSuccess, response));
                // yield put(notifySuccess(`${resource} updated with success!`));
                // yield call(action.payload.resolve, response);
            } catch(error) {
                yield put(actions.updateFail(error));
                // yield put(fail(actionTypes.updateFail, error));
                // yield put(notifyError(`An error occured while updating ${resource}`));
                // yield call(action.payload.reject, { _error: 'Fail' });
            }
        }
    }

    sagas[`delete`] = function*() {
        while (true) {
            try {
                const action = yield take(actionTypes.delete);

                const response = yield call(api.delete, action.payload.id);

                yield put(actions.deleteSuccess({ response, id: action.payload.id }));
                // yield put(success(actionTypes.deleteSuccess, { response, id: action.payload.id }));
                // yield put(notifySuccess(`${resource} deleted with success!`));
                // yield put({ type: actionTypes.list });
            } catch(error) {
                yield put(actions.deleteFail(error));
                // yield put(fail(actionTypes.deleteFail, error));
                // yield put(notifyError(`An error occured while deleting ${resource}`));
            }
        }
    }

    function* handleFilter() {
        yield call(delay, 500);

        yield put(actions.list());
    }

    sagas[`filter`] = function*() {
        let task;

        while (true) {
            yield take([actionTypes.updateFilter, actionTypes.changePage, actionTypes.changeOrder]);

            if (task) {
                yield cancel(task);
            }

            task = yield fork(handleFilter);
        }
    }

    // sagas[`changePage`] = function*() {
    //     while (true) {
    //         yield take(actionTypes.changePage);

    //         yield put({ type: actionTypes.list });
    //     }
    // }

    // sagas['changeOrder'] = function*() {
    //     while (true) {
    //         yield take(actionTypes.changeOrder);

    //         yield put({ type: actionTypes.list });
    //     }
    // }

    return sagas;
}