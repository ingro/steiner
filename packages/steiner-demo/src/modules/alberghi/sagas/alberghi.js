import { put, call, select, cancel, fork, takeEvery } from 'redux-saga/effects';
import { delay, /*takeLatest,*/ } from 'redux-saga';
import _ from 'lodash';
import queryString from 'query-string';

import { navigate } from 'steiner/lib/routing/actions';
import { getTranslations, getLanguage } from 'steiner/lib/settings/reducer';

// import helper from 'helpers/steinerHelper';
import { actions, actionTypes } from '../actions/alberghi';
import { selectors, DEFAULT_STATE } from '../reducers/alberghi';
import api from '../apis/alberghi';

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

export function *generateNotificationPayload(actionKey, type, messages, titles, resource) {
    let translations;

    const language = yield select(getLanguage);

    let message = _.get(messages, `${language}.${actionKey}`);
    let title = _.get(titles, `${language}.${type}`);

    if (! message) {
        translations = yield select(getTranslations);

        const compiled = _.template(translations.templates.actionMessages[actionKey], {
            interpolate : /\{\{([\s\S]+?)\}\}/g
        });

        if (_.isObject(resource)) {
            resource = resource[language];
        }

        message = compiled({ resource });
    }

    if (! title) {
        if (! translations) {
            translations = yield select(getTranslations);
        }

        title = translations.messages.notifications.titles[type];
    }

    return {
        title,
        message,
        status: type === 'success' ? 'success' : 'error'
    };
}

export function bootSagas(sagas, actionTypes) {
    return [
        takeEvery(actionTypes.list, sagas.list),
        takeEvery(actionTypes.fetch, sagas.fetch),
        takeEvery(actionTypes.create, sagas.create),
        takeEvery(actionTypes.update, sagas.update),
        takeEvery(actionTypes.delete, sagas.delete),
        takeEvery([actionTypes.updateFilter, actionTypes.changePage, actionTypes.changeOrder], sagas.filter),
        takeEvery(actionTypes.syncFilters, sagas.syncFilters),
        takeEvery(actionTypes.checkFilterSync, sagas.checkFilterSync),
        takeEvery(actionTypes.resetFilters, sagas.resetFilters)
    ];
}

const defaultOptions = {
    clientFilters: false,
    numberFilters: [],
    getApiListParams: function* getApiListParams(selectors) {
        const filters = yield select(selectors.getFilters);

        return [filters];
    }
};

export function createSagas(resource, actionTypes, actions, api, selectors, defaultState, options = {}) {
    if (resource == null) {
        throw new Error('Expected resource');
    }

    _.defaults(options, defaultOptions);

    resource = _.trim(_.upperFirst(resource));

    const messages = options.messages || {};
    const titles = options.notificationTitles || {};
    const resourceLabel = options.resourceLabel || resource;

    const sagas = {};

    let listTask;

    sagas.fetchList = function*() {
        yield call(delay, 100);

        try {
            const params = yield call(options.getApiListParams, selectors);
            const response = yield call(api.list, ...params);

            yield put(success(actionTypes.listSuccess, response, 'hide'));

            if (options.clientFilters) {
                yield put(actions.filterCollection());
            }
        } catch(error) {
            yield put(fail(actionTypes.listFail, error, 'hide'));
        }
    }

    Object.defineProperty(sagas.fetchList, 'name', {
        value: `fetchList${resource}`
    });

    sagas.list = function*() {
        if (listTask && listTask.isRunning()) {
            yield put({ type: 'NOOP', loadingBar: 'hide' });
            yield cancel(listTask);
        }

        listTask = yield fork(sagas.fetchList);

        // try {
        //     const filters = yield select(selectors.getFilters);
        //     const response = yield call(api.list, filters);

        //     yield put(success(actionTypes.listSuccess, response, 'hide'));

        //     if (options.clientFilters) {
        //         yield put(actions.filterCollection());
        //     }
        // } catch(error) {
        //     yield put(fail(actionTypes.listFail, error, 'hide'));
        // }
    }

    Object.defineProperty(sagas.list, 'name', {
        value: `list${resource}`
    });

    sagas.fetch = function*(action) {
        try {
            const response = yield call(api.fetch, action.payload.id);

            yield put(success(actionTypes.fetchSuccess, response));
        } catch(error) {
            yield put(fail(actionTypes.fetchFail, error));
        }
    }

    Object.defineProperty(sagas.fetch, 'name', {
        value: `fetch${resource}`
    });

    sagas.create = function*(action) {
        try {
            const response = yield call(api.create, action.payload);

            const notification = yield call(generateNotificationPayload, 'createSuccess', 'success', messages, titles, resourceLabel);

            yield put(actions.createSuccess(response, notification));
        } catch(error) {
            const notification = yield call(generateNotificationPayload, 'createFail', 'fail', messages, titles, resourceLabel);

            yield put(actions.createFail(error, notification));
        }
    }

    Object.defineProperty(sagas.create, 'name', {
        value: `create${resource}`
    });

    sagas.update = function*(action) {
        try {
            const response = yield call(api.update, action.payload.id, action.payload);

            const notification = yield call(generateNotificationPayload, 'updateSuccess', 'success', messages, titles, resourceLabel);

            yield put(actions.updateSuccess(response, notification));
        } catch(error) {
            const notification = yield call(generateNotificationPayload, 'updateFail', 'fail', messages, titles, resourceLabel);

            yield put(actions.updateFail(error, notification));
        }
    }

    Object.defineProperty(sagas.update, 'name', {
        value: `update${resource}`
    });

    sagas.delete = function*(action) {
        try {
            const response = yield call(api.delete, action.payload.id);

            const notification = yield call(generateNotificationPayload, 'deleteSuccess', 'success', messages, titles, resourceLabel);

            yield put(actions.deleteSuccess({ response, id: action.payload.id }, notification));
        } catch(error) {
            const notification = yield call(generateNotificationPayload, 'deleteFail', 'fail', messages, titles, resourceLabel);

            yield put(actions.deleteFail(error, notification));
        }
    }

    Object.defineProperty(sagas.delete, 'name', {
        value: `delete${resource}`
    });

    // function* handleFilter() {
    //     yield call(delay, 100);

    //     yield put(actions.list());
    // }

    function getDiff(src, matchers) {
        return _.omitBy(src, (v, k) => matchers[k] == v); // eslint-disable-line
    }

    sagas.filter = function*() {
        // let task;

        const filters = yield select(selectors.getFilters);

        const defaultFilters = defaultState.list.filters;

        // TODO: blacklist params???
        // const diff = _.omit(_._.omitBy(filters.asMutable(), (v, k) => defaultFilters[k] == v), blacklist);

        const diff = getDiff(filters.asMutable(), defaultFilters.asMutable());

        const location = { 
            pathname: window.location.pathname, 
            search: `?${queryString.stringify(diff)}`, 
            query: diff 
        };

        if (options.basename) {
            const re = new RegExp(`^${options.basename}`);
            location.pathname = location.pathname.replace(re, '');
        }

        yield put(navigate(location, 'PUSH'));

        // if (task) {
        //     yield put({ type:'NOOP', loadingBar: 'hide' });
        //     yield cancel(task);
        // }

        if (options.clientFilters) {
            yield put(actions.filterCollection());
        } else {
            // task = yield fork(handleFilter);
            // yield put(actions.list());
        }
    }

    Object.defineProperty(sagas.filter, 'name', {
        value: `filter${resource}`
    });

    // Sync filters from external source (usually the URI) with the store, then call filterCollection or list if needed
    sagas.syncFilters = function*(action) {
        // if (_.isEmpty(action.payload)) {
            // TODO: necessary???
            // yield put(actions.resetFilters());
        // } else {
            // TODO: cycle filters only if options.numberFilters isn't empty
            const filters = {};

            _.forOwn(action.payload, (value, key) => {
                filters[key] = _.includes(options.numberFilters, key) ? parseInt(value, 10) : value;
            });

            yield put(actions.setFilters(filters));
        // }

        if (options.clientFilters) {
            yield put(actions.filterCollection());
        } else {
            if (_.isEmpty(filters)) {
                yield put(actions.list());
            }
        }
        // } else {
        //     yield put(actions.list());
        // }
    }

    Object.defineProperty(sagas.syncFilters, 'name', {
        value: `syncFilters${resource}`
    });

    sagas.checkFilterSync = function*(action) {
        const filters = action.payload;

        _.defaults(filters, defaultState.list.filters.asMutable());

        const currentState = yield select(selectors.getFilters);

        // console.warn(filters);
        // console.warn(currentState);

        const diff = getDiff(filters, currentState);

        // console.warn(diff);

        if (! _.isEmpty(diff)) {
            yield put(actions.syncFilters(filters));
        }
    }

    Object.defineProperty(sagas.checkFilterSync, 'name', {
        value: `checkFilterSync${resource}`
    });

    sagas.resetFilters = function*() {
        const filters = defaultState.list.filters.asMutable();

        yield put(actions.setFilters(filters));
    }

    Object.defineProperty(sagas.resetFilters, 'name', {
        value: `resetFilters${resource}`
    });

    return sagas;
}

/**** BOOT ****/

const sagas = createSagas('alberghi', actionTypes, actions, api, selectors, DEFAULT_STATE);

const defaultSagas = bootSagas(sagas, actionTypes);

export default [
    ...defaultSagas
];

/***** OLD MODULE *****/

// import { sagaCreator } from 'steiner';

// import helper from 'helpers/steinerHelper';
// import { actions, actionTypes } from '../actions/alberghi';
// import { selectors, DEFAULT_STATE } from '../reducers/alberghi';
// import api from '../apis/alberghi';

// export default {
//     createSagas,
//     bootSagas
// };

// const sagas = helper.createSagas('alberghi', actionTypes, actions, api, selectors, DEFAULT_STATE);

// const defaultSagas = sagaCreator.bootSagas(sagas, actionTypes);

// export default [
//     ...defaultSagas
// ];