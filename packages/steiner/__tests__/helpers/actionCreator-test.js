import { createActions, createActionTypes } from '../../src/helpers/actionCreator';

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

        expect(actions.fetch(42)).toMatchSnapshot();
        expect(actions.list()).toMatchSnapshot();
        expect(actions.create({ foo: 'bar' })).toMatchSnapshot();
        expect(actions.createSuccess({ foo: 'bar' }, { type: 'success' })).toMatchSnapshot();
        expect(actions.createFail({ foo: 'bar' }, { type: 'fail' })).toMatchSnapshot();
        expect(actions.update(42, { foo: 'bar' })).toMatchSnapshot();
        expect(actions.updateSuccess({ foo: 'bar' }, { type: 'success' })).toMatchSnapshot();
        expect(actions.updateFail({ foo: 'bar' }, { type: 'fail' })).toMatchSnapshot();
        expect(actions.delete(42)).toMatchSnapshot();
        expect(actions.deleteSuccess({ foo: 'bar' }, { type: 'success' })).toMatchSnapshot();
        expect(actions.deleteFail({ foo: 'bar' }, { type: 'fail' })).toMatchSnapshot();
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