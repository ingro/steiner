import { reducerCreator } from 'steiner';
// import matchSorter from 'match-sorter';
// import sift from 'sift';
import _ from 'lodash';

import helper from 'helpers/steinerHelper';
import { actionTypes } from '../actions/offers';

export const DEFAULT_STATE = helper.createDefaultState({
    list: {
        filters: {
            // To fetch all from API
            perPage: 200,
            hotelsId: null,
            priceMin: '',
            priceMax: ''
        }
    }
});

const handlers = helper.createHandlers(actionTypes, {
    additionalFilters: {
        hotelsId: {
            field: 'hotelsId',
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
});

// handlers[actionTypes.filterCollection] = (state, action) => {
//     let itemsId = [];
//     const filters = state.list.filters;
//     const items = state.list.itemsById;

//     if (filters.q === '') {
//         itemsId = Object.keys(items);
//     } else {
//         const matches = matchSorter(Object.values(items), filters.q, {
//             // TODO: This should be an option
//             keys: ['title'],
//             threshold: matchSorter.rankings.CONTAINS
//         });

//         itemsId = matches.map(match => match.id);
//     }

//     let filtered = itemsId.map(id => items[id]);

//     const query = {};

//     Object.keys(filters).forEach(key => {
//         if (_.includes(Object.keys(additionalFilters), key) && filters[key]) {
//             const queryKey = additionalFilters[key].field;
//             if (! query[queryKey]) {
//                 query[queryKey] = {};
//             }

//             query[queryKey][additionalFilters[key].op] = filters[key];
//         }
//     });

//     // console.warn(filtered);
//     // console.warn(query);
    
//     filtered = sift(query, filtered);

//     let sorted = _.sortBy(filtered, filters.orderKey ? filters.orderKey : 'id');

//     if (filters.orderDirection === 'DESC') {
//         sorted = sorted.reverse();
//     }
    
//     return state.updateIn(['list'], list => ({
//         ...list,
//         itemsId: sorted.map(item => item.id)
//     }));
// };

export default reducerCreator.createReducer(handlers, DEFAULT_STATE);

export const selectors = reducerCreator.createSelectors('offers');