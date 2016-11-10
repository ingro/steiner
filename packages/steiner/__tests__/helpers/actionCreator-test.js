import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
 
import { createActions, createActionTypes } from '../../src/helpers/actionCreator';

const fakeState = {
    settings: {
        language: 'en',
        translations: {
            templates: {
                actionMessages: {
                    createSuccess: '{{resource}} created with success!',
                    createFail: 'An error occured while creating {{resource}}',
                    updateSuccess: '{{resource}} updated successfully!',
                    updateFail: 'An error occured while updating {{resource}}',
                    deleteSuccess: '{{resource}} deleted with success!',
                    deleteFail: 'An error occured while deleting {{resource}}'
                }
            },
            messages: {
                notifications: {
                    titles: {
                        success: 'Hooray!',
                        fail: 'Oh snap!'
                    }
                }
            }
        }
    }
};

const middlewares = [thunk]; 
const mockStore = configureStore(middlewares);

describe('createActionTypes', () => {
    it('generates the correct action types', () => {
        const actionTypes = createActionTypes('posts');

        expect(actionTypes).toMatchSnapshot();
    });
});

describe('createActions', () => {
    it('generates the correct actions', () => {
        const actionTypes = createActionTypes('posts');

        const actions = createActions('posts', actionTypes);

        const store = mockStore(fakeState);

        expect(actions.fetch(42)).toMatchSnapshot();
        expect(actions.list()).toMatchSnapshot();

        store.dispatch(actions.createSuccess({ foo: 'bar' }));
        store.dispatch(actions.createFail({ foo: 'bar' }));
        store.dispatch(actions.updateSuccess({ foo: 'bar' }));
        store.dispatch(actions.updateFail({ foo: 'bar' }));
        store.dispatch(actions.deleteSuccess({ foo: 'bar' }));
        store.dispatch(actions.deleteFail({ foo: 'bar' }));

        const storeActions = store.getActions();

        expect(actions.create({ foo: 'bar' })).toMatchSnapshot();
        expect(storeActions[0]).toMatchSnapshot();
        expect(storeActions[1]).toMatchSnapshot();
        expect(actions.update(42, { foo: 'bar' })).toMatchSnapshot();
        expect(storeActions[2]).toMatchSnapshot();
        expect(storeActions[3]).toMatchSnapshot();
        expect(actions.delete(42)).toMatchSnapshot();
        expect(storeActions[4]).toMatchSnapshot();
        expect(storeActions[5]).toMatchSnapshot();
        expect(actions.resetCurrent()).toMatchSnapshot();
        expect(actions.changePage(3)).toMatchSnapshot();
        expect(actions.changeOrder('name', 'DESC')).toMatchSnapshot();
        expect(actions.updateFilter('q', 'foo')).toMatchSnapshot();
        expect(actions.syncFilters('q', 'bar')).toMatchSnapshot();
        expect(actions.checkFilterSync('q', 'baz')).toMatchSnapshot();
        expect(actions.select(42)).toMatchSnapshot();
        expect(actions.deselect(42)).toMatchSnapshot();
        expect(actions.selectAll()).toMatchSnapshot();
        expect(actions.deselectAll()).toMatchSnapshot();
        expect(actions.resetFilters()).toMatchSnapshot();
        expect(actions.setFilters({ foo: 'bar' })).toMatchSnapshot();
    });
});