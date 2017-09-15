import { createHandlers, createSelectors, DEFAULT_STATE } from '../../src/helpers/reducerCreator';
import { createActionTypes } from '../../src/helpers/actionCreator';

describe('createHandlers', () => {
    const actionTypes = createActionTypes('posts');
    const handlers = createHandlers(actionTypes);

    const state = DEFAULT_STATE;

    it('handles correctly list action', () => {
        expect(handlers[actionTypes.list](state)).toMatchSnapshot();
    });

    it('handles correctly listSuccess action', () => {
        const action = {
            payload: {
                data: {
                    data: [
                        {
                            id: 33,
                            name: 'foo'
                        },
                        {
                            id: 44,
                            name: 'bar'
                        }
                    ],
                    meta: {
                        total: 2
                    }
                }
            }
        }

        expect(handlers[actionTypes.listSuccess](state, action)).toMatchSnapshot();
    });

    it('handles correctly listFail action', () => {
        const action = {
            error: {
                message: 'error'
            }
        };

        expect(handlers[actionTypes.listFail](state, action)).toMatchSnapshot();
    });

    it('handles correctly fetch action', () => {
        expect(handlers[actionTypes.fetch](state)).toMatchSnapshot();
    });

    it('handles correctly fetchSuccess action', () => {
        const action = {
            payload: {
                data: {
                    id: 42,
                    name: 'foo'
                }
            }
        };

        expect(handlers[actionTypes.fetchSuccess](state, action)).toMatchSnapshot();
    });

    it('handles correctly fetchFail action', () => {
        const action = {
            error: {
                message: 'error'
            }
        };

        expect(handlers[actionTypes.fetchFail](state, action)).toMatchSnapshot();
    });

    it('handles correctly deleteSuccess action', () => {
        const action = {
            payload: {
                id: 42
            }
        };

        const deleteState = DEFAULT_STATE.setIn(['list', 'itemsById'], { 33: { foo: 'bar' }, 42: { foo: 'bar' }}).setIn(['list', 'itemsId'], [33, 42]);

        expect(handlers[actionTypes.deleteSuccess](deleteState, action)).toMatchSnapshot();
    });

    it('handles correctly resetCurrent action', () => {
        const resetState = DEFAULT_STATE.setIn(['current', 'item'], { id: 42, foo: 'bar'});

        expect(handlers[actionTypes.resetCurrent](resetState)).toMatchSnapshot();
    });

    it('handles correctly updateFilter action', () => {
        const action = {
            payload: {
                key: 'q',
                value: 'hello'
            }
        };

        expect(handlers[actionTypes.updateFilter](state, action)).toMatchSnapshot();
    });

    it('handles correctly setFilters action', () => {
        const action = {
            payload: {
                page: '10',
                q: 'hello'
            }
        };

        expect(handlers[actionTypes.setFilters](state, action)).toMatchSnapshot();
    });

    it('handles correctly changePage action', () => {
        const action = {
            payload: {
                page: '10'
            }
        };

        expect(handlers[actionTypes.changePage](state, action)).toMatchSnapshot();
    });

    it('handles correctly changeOrder action', () => {
        const action = {
            payload: {
                key: 'name',
                direction: 'DESC'
            }
        };

        expect(handlers[actionTypes.changeOrder](state, action)).toMatchSnapshot();
    });

    it('handles correctly select action', () => {
        const action = {
            payload: [33]
        };

        const selectState = DEFAULT_STATE.setIn(['list', 'selected'], [42]);

        expect(handlers[actionTypes.select](selectState, action)).toMatchSnapshot();
    });

    it('handles correctly deselect action', () => {
        const action = {
            payload: [33]
        };

        const deselectState = DEFAULT_STATE.setIn(['list', 'selected'], [33]);

        expect(handlers[actionTypes.deselect](deselectState, action)).toMatchSnapshot();
    });

    it('handles correctly selectAll action', () => {
        const selectState = DEFAULT_STATE.setIn(['list', 'itemsId'], [33, 42, 56]);

        expect(handlers[actionTypes.selectAll](selectState)).toMatchSnapshot();
    });

    it('handles correctly deselectAll action', () => {
        const selectState = DEFAULT_STATE.setIn(['list', 'selected'], [33, 42, 56]);

        expect(handlers[actionTypes.deselectAll](selectState)).toMatchSnapshot();
    });

    // it('handles correctly resetFilters action', () => {
    //     const prevState = DEFAULT_STATE.setIn(['list', 'filters'], {
    //         q: 'foo',
    //         page: 2,
    //         perPage: 20,
    //         orderKey: null,
    //         orderDirection: 'ASC'
    //     });

    //     expect(handlers[actionTypes.resetFilters](prevState, {}, DEFAULT_STATE)).toMatchSnapshot();
    // });
});

describe('createSelectors', () => {
    const selectors = createSelectors('posts');

    const state = {
        posts: DEFAULT_STATE
            .setIn(['list', 'itemsId'], [33, 42])
            .setIn(['list', 'itemsById'], { 33: { id: 33, name: 'foo' }, 42: { id: 42, name: 'bar' }})
            .setIn(['list', 'selected'], [42])
    }

    it('listSelector returns the list from the state', () => {
        expect(selectors.listSelector(state)).toMatchSnapshot();
    });

    it('itemsSelector returns the list of items from the state', () => {
        expect(selectors.itemsSelector(state)).toMatchSnapshot();
    });

    it('currentSelector returns the current item from the state', () => {
        expect(selectors.currentSelector(state)).toMatchSnapshot();
    });

    it('getFilters returns the filters from the state', () => {
        expect(selectors.getFilters(state)).toMatchSnapshot();
    });

    it('getSelectedId returns the filters from the state', () => {
        expect(selectors.getSelectedId(state)).toMatchSnapshot();
    });

    it('getSelected returns the filters from the state', () => {
        expect(selectors.getSelected(state)).toMatchSnapshot();
    });
});