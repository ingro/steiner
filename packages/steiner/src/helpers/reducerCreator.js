import Immutable from 'seamless-immutable';
import matchSorter from 'match-sorter';
import sift from 'sift';
import _ from 'lodash';

import { actionTypes as authActionTypes } from '../auth/actions';

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
            orderKey: null,
            orderDirection: 'ASC'
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
        itemsById: {},
        itemsId: [],
        total: 0,
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
    return state.updateIn(['list'], list => ({
        ...list,
        itemsById: list.itemsById.without(action.payload.id),
        itemsId: _.difference(list.itemsId, [action.payload.id])
    }));
}

function resetCurrent(state, action) {
    return state.update('current', () => ({
        item: null,
        isFetching: false,
        errorMessage: null
    }));
}

function updateFilter(state, action) {
    return state.setIn(['list', 'filters', action.payload.key], action.payload.value);
}

function setFilters(state, action) {
    const toSync = action.payload;

    if (toSync.page) {
        toSync.page = parseInt(toSync.page, 10);
    }

    if (toSync.perPage) {
        toSync.perPage = parseInt(toSync.perPage, 10);
    }

    return state.updateIn(['list', 'filters'], filters => {
        return Immutable.merge(filters, toSync);
        // ...filters,
        // ...toSync
    }); 
}

// function resetFilters(state, action, defaultState) {
//     return state.setIn(['list', 'filters'], defaultState.list.filters);
// }

function changePage(state, action) {
    return state.setIn(['list', 'filters', 'page'], parseInt(action.payload.page, 10));
}

function changeOrder(state, action) {
    const { key, direction } = action.payload;

    return state.updateIn(['list', 'filters'], filters => {
        return Immutable.merge(filters, {
            orderKey: key,
            orderDirection: direction
        });
        // ...filters,
        // orderKey: key,
        // orderDirection: direction
    });
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

/**
 * For example
    {
        additionalFilters: {
            countryId: {
                field: 'countryId',
                op: '$eq'
            },
            priceMin: {
                field: 'price',
                op: '$gte',
            },
            priceMax: {
                field: 'price',
                op: '$lte',
            }
        },
        searchKeys: ['title']
    }
 */
const defaultFilterCollectionOptions = {
    additionalFilters: {},
    defaultOrderKey: 'id',
    searchKeys: ['name']
};

function createFilterCollectionHandler(options = {}) {
    _.defaults(options, defaultFilterCollectionOptions);

    const { additionalFilters, defaultOrderKey, searchKeys } = options;

    return function filterCollection(state, action) {
        // let itemsId = [];
        let filtered = [];

        const filters = state.list.filters;
        const items = state.list.itemsById;

        if (filters.q === '') {
            filtered = Object.values(items);
            // itemsId = Object.keys(items);
        } else {
            filtered = matchSorter(Object.values(items), filters.q, {
                keys: searchKeys,
                threshold: matchSorter.rankings.CONTAINS
            });

            // itemsId = matches.map(match => match.id);
        }

        // let filtered = itemsId.map(id => items[id]);

        const query = {};

        Object.keys(filters).forEach(key => {
            if (_.includes(Object.keys(additionalFilters), key) && filters[key]) {
                const queryKey = additionalFilters[key].field;
                if (! query[queryKey]) {
                    query[queryKey] = {};
                }

                query[queryKey][additionalFilters[key].op] = filters[key];
            }
        });
        
        filtered = sift(query, filtered);

        let sorted = _.sortBy(filtered, filters.orderKey ? filters.orderKey : defaultOrderKey);

        if (filters.orderDirection === 'DESC') {
            sorted = sorted.reverse();
        }

        if (filters.perPage > 0 && sorted.length > 0) {
            const start = (filters.page * filters.perPage) - filters.perPage;
            const end = filters.page * filters.perPage;
            sorted = sorted.slice(start, end);
        }
        
        return state.updateIn(['list'], list => ({
            ...list,
            itemsId: sorted.map(item => item.id)
        }));
    }
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
        [actionTypes.updateFilter]: updateFilter,
        [actionTypes.setFilters]: setFilters,
        // [actionTypes.resetFilters]: resetFilters,
        [actionTypes.changePage]: changePage,
        [actionTypes.changeOrder]: changeOrder,
        [actionTypes.select]: select,
        [actionTypes.deselect]: deselect,
        [actionTypes.selectAll]: selectAll,
        [actionTypes.deselectAll]: deselectAll,
        [actionTypes.filterCollection]: createFilterCollectionHandler(options)
    };
}

export function createSelectors(key) {
    return {
        currentSelector: state => state[key].current,
        getFilters: state => state[key].list.filters,
        getSelected: state => state[key].list.selected.map(id => state[key].list.itemsById[id]),
        getSelectedId: state => state[key].list.selected,
        itemSelector: (state, id) => state[key].list.itemsById[id],
        itemsSelector: state => state[key].list.itemsId.map(id => state[key].list.itemsById[id]),
        listSelector: state => state[key].list
    };
}

export function createReducer(handlers, defaultState = DEFAULT_STATE, options = {}) {
    _.defaults(options, {
        resetOnLogout: true
    });

    if (options.resetOnLogout) {
        handlers[authActionTypes.logoutSuccess] = () => defaultState;
    }

    return function(state = defaultState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action/*, DEFAULT_STATE*/);
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