import Immutable from 'seamless-immutable';
import { take, put, call, select, cancel, fork } from 'redux-saga/effects';
import { delay, takeLatest } from 'redux-saga';

import { createSagas } from '../../src/helpers/sagaCreator';
import { createActions, createActionTypes } from '../../src/helpers/actionCreator';

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

    const sagas = createSagas('posts', actionTypes, actions, api, selectors, defaultState);

    it('generates list saga correctly', () => {
        const generator = sagas.list();

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

        expect(generator.next().value).toEqual(select(selectors.getFilters));
        expect(generator.next(filters).value).toEqual(call(api.list, filters));
        expect(generator.next(response).value).toEqual(put(success));
        expect(generator.throw('error').value).toEqual(put(error));
    });

    it('generates fetch saga correctly', () => {
        const generator = sagas.fetch();

        const action = {
            payload: {
                id: 42
            }
        };

        const response = { id: 42, foo: 'bar' };

        const success = {
            type: actionTypes.fetchSuccess,
            payload: response
        };
        const error = {
            type: actionTypes.fetchFail,
            error: 'error'
        };

        expect(generator.next().value).toEqual(take(actionTypes.fetch));
        expect(generator.next(action).value).toEqual(call(api.fetch, 42));
        expect(generator.next(response).value).toEqual(put(success));
        expect(generator.throw('error').value).toEqual(put(error));
    });

    it('generates create saga correctly', () => {
        const generator = sagas.create();

        const action = {
            payload: {
                foo: 'bar'
            }
        };

        const response = { id: 42, foo: 'bar' };

        expect(generator.next().value).toEqual(take(actionTypes.create));
        expect(generator.next(action).value).toEqual(call(api.create, { foo: 'bar' }));
        expect(generator.next(response).value).toEqual(put(actions.createSuccess(response)));
        expect(generator.throw('error').value).toEqual(put(actions.createFail('error')));
    });

    it('generates update saga correctly', () => {
        const generator = sagas.update();

        const action = {
            payload: {
                id: 42,
                foo: 'bar'
            }
        };

        const response = { id: 42, foo: 'bar' };

        expect(generator.next().value).toEqual(take(actionTypes.update));
        expect(generator.next(action).value).toEqual(call(api.update, 42, { id: 42, foo: 'bar' }));
        expect(generator.next(response).value).toEqual(put(actions.updateSuccess(response)));
        expect(generator.throw('error').value).toEqual(put(actions.updateFail('error')));
    });

    it('generates delete saga correctly', () => {
        const generator = sagas.delete();

        const action = {
            payload: {
                id: 42
            }
        };

        const response = { id: 42, foo: 'bar' };

        expect(generator.next().value).toEqual(take(actionTypes.delete));
        expect(generator.next(action).value).toEqual(call(api.delete, 42));
        expect(generator.next(response).value).toEqual(put(actions.deleteSuccess({ response, id: 42 })));
        expect(generator.throw('error').value).toEqual(put(actions.deleteFail('error')));
    });

    it('generates filter saga correctly', () => {
        const generator = sagas.filter();

        const filters = Immutable({
            q: 'hello'
        });

        const navigate = {
            action: 'PUSH',
            type: 'NAVIGATE',
            location: {
                pathname: 'blank',
                query: {
                    q: 'hello'
                },
                search: '?q=hello'
            }
        };

        // const handleFilter = () => {};

        expect(generator.next().value).toEqual(take([actionTypes.updateFilter, actionTypes.changePage, actionTypes.changeOrder]));
        expect(generator.next().value).toEqual(select(selectors.getFilters));
        expect(generator.next(filters).value).toEqual(put(navigate));
        // TODO: not working because handleFilter is private inside SagaCreator
        // expect(generator.next(handleFilter).value).toEqual(fork(handleFilter));
    });

    it('generates syncFilters saga correctly', () => {
        const generator = sagas.syncFilters();

        expect(generator.next().value).toEqual(take(actionTypes.syncFilters));
        expect(generator.next().value).toEqual(put(actions.list()));
    });

    it('generates checkSync saga correctly', () => {
        const generator = sagas.checkSync();

        const action = { 
            payload: { 
                q: 'hello' 

            }
        };

        const currentState = {
            q: ''
        };

        const syncAction = {
            type: actionTypes.syncFilters,
            payload: {
                q: 'hello'
            }
        };

        expect(generator.next().value).toEqual(take(actionTypes.checkSync));
        expect(generator.next(action).value).toEqual(select(selectors.getFilters));
        expect(generator.next(currentState).value).toEqual(put(syncAction));
    });
});