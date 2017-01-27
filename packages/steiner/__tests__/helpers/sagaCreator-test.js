import Immutable from 'seamless-immutable';
import { /*take,*/ put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import testSaga from 'redux-saga-test-plan';

import { createSagas, generateNotificationPayload } from '../../src/helpers/sagaCreator';
import { createActions, createActionTypes } from '../../src/helpers/actionCreator';
import { NAVIGATE } from '../../src/routing/actions';

describe('createSagas', () => {
    const actionTypes = createActionTypes('posts');
    const actions = createActions('posts', actionTypes);

    const api = {
        list() {},
        fetch() {},
        create() {},
        update() {},
        delete() {}
    };

    const selectors = {
        getFilters() {}
    };

    const defaultState = Immutable({
        list: {
            filters: {
                q: ''
            }
        }
    });

    const options = {
        getApiListParams: function() {
            return [{ foo: 'bar' }];
        }
    };

    const sagas = createSagas('posts', actionTypes, actions, api, selectors, defaultState, options);

    it('generates list saga correctly', () => {
        const generator = sagas.fetchList();

        const filters = { foo: 'bar' };
        const response = { data: [1, 2, 3] };
        const success = {
            type: actionTypes.listSuccess,
            payload: response, 
            loadingBar: 'hide'
        };
        const error = {
            type: actionTypes.listFail,
            error: 'error',
            loadingBar: 'hide'
        };

        // const saga = testSaga(sagas.list);

        // saga.next().select(selectors.getFilters);
        // saga.next(filters).call(api.list, filters);
        // saga.next(response).put(success);
        // saga.throw('error').put(error);

        expect(generator.next().value).toEqual(call(delay, 100));
        expect(generator.next().value).toEqual(call(options.getApiListParams, selectors));
        // expect(generator.next().value).toEqual(select(selectors.getFilters));
        expect(generator.next([filters]).value).toEqual(call(api.list, filters));
        expect(generator.next(response).value).toEqual(put(success));
        expect(generator.throw('error').value).toEqual(put(error));
    });

    it('generates fetch saga correctly', () => {
        const action = {
            payload: {
                id: 42
            }
        };

        const generator = sagas.fetch(action);

        const response = { id: 42, foo: 'bar' };

        const success = {
            type: actionTypes.fetchSuccess,
            payload: response
        };
        const error = {
            type: actionTypes.fetchFail,
            error: 'error'
        };

        // expect(generator.next().value).toEqual(take(actionTypes.fetch));
        expect(generator.next().value).toEqual(call(api.fetch, 42));
        expect(generator.next(response).value).toEqual(put(success));
        expect(generator.throw('error').value).toEqual(put(error));
    });

    it('generates create saga correctly', () => {
        // const generator = sagas.create();

        const action = {
            payload: {
                foo: 'bar'
            }
        };

        const response = { id: 42, foo: 'bar' };
        const notification = { type: 'success' };

        const saga = testSaga(sagas.create, action);

        saga
        // .next().take(actionTypes.create)
        .next().call(api.create, { foo: 'bar' })
        .save('beforeSuccess')
        .next(response).call(generateNotificationPayload, 'createSuccess', 'success', {}, {}, 'Posts')
        .next(notification).put(actions.createSuccess(response, notification))
        .restore('beforeSuccess')
        .throw('error')
        .call(generateNotificationPayload, 'createFail', 'fail', {}, {}, 'Posts')
        .next(notification).put(actions.createFail('error', notification));
        
        // expect(generator.next().value).toEqual(take(actionTypes.create));
        // expect(generator.next(action).value).toEqual(call(api.create, { foo: 'bar' }));
        // expect(generator.next(response).value).toEqual(call(generateNotificationPayload, 'createSuccess', 'success', {}, {}, 'Posts'));
        // expect(generator.next(notification).value).toEqual(put(actions.createSuccess(response, notification)));
    });

    it('generates update saga correctly', () => {
        // const generator = sagas.update();

        const action = {
            payload: {
                id: 42,
                foo: 'bar'
            }
        };

        const response = { id: 42, foo: 'bar' };
        const notification = { type: 'success' };

        const saga = testSaga(sagas.update, action);

        // expect(generator.next().value).toEqual(take(actionTypes.update));
        // expect(generator.next(action).value).toEqual(call(api.update, 42, { id: 42, foo: 'bar' }));
        // expect(generator.next(response).value).toEqual(call(generateNotificationPayload, 'updateSuccess', 'success', {}, {}, 'Posts'));
        // expect(generator.next(notification).value).toEqual(put(actions.updateSuccess(response, notification)));
        
        saga
        // .next().take(actionTypes.update)
        .next().call(api.update, 42, { id: 42, foo: 'bar' })
        .save('beforeSuccess')
        .next(response).call(generateNotificationPayload, 'updateSuccess', 'success', {}, {}, 'Posts')
        .next(notification).put(actions.updateSuccess(response, notification))
        .restore('beforeSuccess')
        .throw('error')
        .call(generateNotificationPayload, 'updateFail', 'fail', {}, {}, 'Posts')
        .next(notification).put(actions.updateFail('error', notification)); 
    });

    it('generates delete saga correctly', () => {
        // const generator = sagas.delete();

        const action = {
            payload: {
                id: 42
            }
        };

        const response = { id: 42, foo: 'bar' };
        const notification = { type: 'success' };

        const saga = testSaga(sagas.delete, action);

        // expect(generator.next().value).toEqual(take(actionTypes.delete));
        // expect(generator.next(action).value).toEqual(call(api.delete, 42));
        // expect(generator.next(response).value).toEqual(call(generateNotificationPayload, 'deleteSuccess', 'success', {}, {}, 'Posts'));
        // expect(generator.next(notification).value).toEqual(put(actions.deleteSuccess(response, notification)));
        
        saga
        // .next().take(actionTypes.delete)
        .next().call(api.delete, 42)
        .save('beforeSuccess')
        .next(response).call(generateNotificationPayload, 'deleteSuccess', 'success', {}, {}, 'Posts')
        .next(notification).put(actions.deleteSuccess({ response, id: 42} , notification))
        .restore('beforeSuccess')
        .throw('error')
        .call(generateNotificationPayload, 'deleteFail', 'fail', {}, {}, 'Posts')
        .next(notification).put(actions.deleteFail('error', notification)); 
    });

    it('generates filter saga correctly', () => {
        const generator = sagas.filter();

        const filters = Immutable({
            q: 'hello'
        });

        const navigateAction = {
            action: 'PUSH',
            type: NAVIGATE,
            location: {
                pathname: 'blank',
                query: {
                    q: 'hello'
                },
                search: '?q=hello'
            }
        };

        // const handleFilter = () => {};

        // expect(generator.next().value).toEqual(take([actionTypes.updateFilter, actionTypes.changePage, actionTypes.changeOrder]));
        expect(generator.next().value).toEqual(select(selectors.getFilters));
        expect(generator.next(filters).value).toEqual(put(navigateAction));
        // TODO: not working because handleFilter is private inside SagaCreator
        // expect(generator.next(handleFilter).value).toEqual(fork(handleFilter));
    });

    it('generates syncFilters saga correctly', () => {
        const action = {
            payload: {}
        };

        const generator = sagas.syncFilters(action);

        // expect(generator.next().value).toEqual(take(actionTypes.syncFilters));
        expect(generator.next().value).toEqual(put(actions.resetFilters()));
        // TODO: test with non-empty payload
        expect(generator.next().value).toEqual(put(actions.list()));
    });

    it('generates checkFilterSync saga correctly', () => {
        const action = { 
            payload: { 
                q: 'hello' 

            }
        };

        const generator = sagas.checkFilterSync(action);

        const currentState = {
            q: ''
        };

        const syncAction = {
            type: actionTypes.syncFilters,
            payload: {
                q: 'hello'
            }
        };

        // expect(generator.next().value).toEqual(take(actionTypes.checkFilterSync));
        expect(generator.next().value).toEqual(select(selectors.getFilters));
        expect(generator.next(currentState).value).toEqual(put(syncAction));
    });
});