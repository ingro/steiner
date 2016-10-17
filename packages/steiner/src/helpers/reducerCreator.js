import Immutable from 'seamless-immutable';
import _ from 'lodash';

export const DEFAULT_STATE = Immutable({
    list: {
        errorMessage: null,
        isFetching: false,
        itemsById: {},
        itemsId: [],
        selected: [],
        filters: {
            q: '',
            page: 1,
            perPage: 20,
            order: {
                key: null,
                direction: 'ASC'
            }
        },
        total: 0
    },
    current: {
        errorMessage: null,
        isFetching: false,
        item: null
    }
});

const defaultListSuccessOptions = {
    items: 'data.data',
    total: 'data.meta.total',
    idKey: 'id'
};

function createListSuccessHandler(options = {}) {
    _.defaults(options, defaultListSuccessOptions);

    return function listSuccess(state, action) {
        const items = typeof options.items === 'function' ? options.items(action.payload) : _.get(action.payload, options.items);

        const itemsId = items.map(item => item[options.idKey]);

        return state.update('list', list => ({
            ...list,
            itemsId,
            itemsById: items.reduce((byId, item) => {
                byId[item[options.idKey]] = item;

                return byId;
            }, {}),
            selected: _.intersection(itemsId, state.list.selected),
            isFetching: false,
            errorMessage: null,
            total: typeof options.total === 'function' ? options.total(action.payload) : _.get(action.payload, options.total)
        }));
    }
}

function list(state, action) {
    return state.setIn(['list', 'isFetching'], true);
}

function listFail(state, action) {
    return state.update('list', list => ({
        ...list,
        isFetching: false,
        errorMessage: action.error.message
    }));
}

function fetch(state, action) {
    return state.update('current', current => ({
        ...current,
        item: null,
        isFetching: true
    }));
}

function fetchSuccess(state, action) {
    return state.update('current', () => ({
        item: action.payload.data,
        isFetching: false,
        errorMessage: null
    }));
}

function fetchFail(state, action) {
    return state.update('current', current => ({
        ...current,
        isFetching: false,
        errorMessage: action.error.message
    }));
}

function deleteSuccess(state, action) {
    return state.setIn(['list', 'items'], _.reject(state.list.items, {id: action.payload.id }));
}

function resetCurrent(state, action) {
    return state.update('current', () => ({
        item: null,
        isFetching: false,
        errorMessage: null
    }));
}

function changePage(state, action) {
    return state.setIn(['list', 'filters', 'page'], action.payload.page);
}

function updateFilter(state, action) {
    return state.setIn(['list', 'filters', action.payload.key], action.payload.value);
}

function changeOrder(state, action) {
    return state.setIn(['list', 'filters', 'order'], action.payload);
}

function select(state, action) {
    const selected = _.uniq([].concat(state.list.selected, action.payload));
    return state.setIn(['list', 'selected'], selected);
}

function deselect(state, action) {
    const selected = _.difference(state.list.selected, action.payload);
    return state.setIn(['list', 'selected'], selected);
}

function selectAll(state) {
    return state.setIn(['list', 'selected'], state.list.itemsId);
}

function deselectAll(state) {
    return state.setIn(['list', 'selected'], []);
}

export function createHandlers(actionTypes, options = {}) {
    return {
        [actionTypes.list]: list,
        [actionTypes.listSuccess]: createListSuccessHandler(options),
        [actionTypes.listFail]: listFail,
        [actionTypes.fetch]: fetch,
        [actionTypes.fetchSuccess]: fetchSuccess,
        [actionTypes.fetchFail]: fetchFail,
        [actionTypes.deleteSuccess]: deleteSuccess,
        [actionTypes.resetCurrent]: resetCurrent,
        [actionTypes.changePage]: changePage,
        [actionTypes.updateFilter]: updateFilter,
        [actionTypes.changeOrder]: changeOrder,
        [actionTypes.select]: select,
        [actionTypes.deselect]: deselect,
        [actionTypes.selectAll]: selectAll,
        [actionTypes.deselectAll]: deselectAll
    };
}

export function createSelectors(key) {
    return {
        listSelector: state => state[key].list,
        itemsSelector: state => state[key].list.itemsId.map(id => state[key].list.itemsById[id]),
        currentSelector: state => state[key].current,
        getFilters: state => state[key].list.filters,
        getSelectedId: state => state[key].list.selected,
        getSelected: state => state[key].list.selected.map(id => state[key].list.itemsById[id])
    }
}

export function createReducer(handlers, defaultState = DEFAULT_STATE) {
    return function(state = defaultState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}

export default {
    createHandlers,
    createReducer,
    createSelectors,
    DEFAULT_STATE
};