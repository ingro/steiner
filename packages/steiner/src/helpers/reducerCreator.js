import Immutable from 'seamless-immutable';
import reject from 'lodash/reject';

export const DEFAULT_STATE = Immutable({
    list: {
        errorMessage: null,
        isFetching: false,
        items: [],
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

function list(state, action) {
    return state.setIn(['list', 'isFetching'], true);
}

function listSuccess(state, action) {
    return state.update('list', list => ({
        ...list,
        items: action.payload.data.data,
        isFetching: false,
        errorMessage: null,
        total: action.payload.data.meta.total
    }));
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
    return state.setIn(['list', 'items'], reject(state.list.items, {id: action.payload.id }));
}

function resetCurrent(state, action) {
    return state.update('current', () => ({
        item: null,
        isFetching: false,
        errorMessage: null
    }));
}

// function inputQuery(state, action) {
//     return state.setIn(['list', 'filters', 'q'], action.payload.q);
// }

function changePage(state, action) {
    return state.setIn(['list', 'filters', 'page'], action.payload.page);
}

function updateFilter(state, action) {
    return state.setIn(['list', 'filters', action.payload.key], action.payload.value);
}

function changeOrder(state, action) {
    return state.setIn(['list', 'filters', 'order'], action.payload);
}

export function createHandlers(actionTypes) {
    return {
        [actionTypes.list]: list,
        [actionTypes.listSuccess]: listSuccess,
        [actionTypes.listFail]: listFail,
        [actionTypes.fetch]: fetch,
        [actionTypes.fetchSuccess]: fetchSuccess,
        [actionTypes.fetchFail]: fetchFail,
        [actionTypes.deleteSuccess]: deleteSuccess,
        [actionTypes.resetCurrent]: resetCurrent,
        // [actionTypes.inputQuery]: inputQuery,
        [actionTypes.changePage]: changePage,
        [actionTypes.updateFilter]: updateFilter,
        [actionTypes.changeOrder]: changeOrder
    };
}

export function createSelectors(key) {
    return {
        listSelector: state => state[key].list,
        currentSelector: state => state[key].current,
        getFilters: state => state[key].list.filters
    }
}

export default function createReducer(handlers, defaultState = DEFAULT_STATE) {
    return function(state = defaultState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}