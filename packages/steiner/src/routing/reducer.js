import Immutable from 'seamless-immutable';

import { actionTypes } from './actions';
import { createReducer } from '../helpers/reducerCreator';

export const DEFAULT_STATE = Immutable({
    current: {
        location: { pathname: '/' },
        action: 'PUSH'
    }, 
    previous: {
        location: null,
        action: null
    }
});

const handlers = {
    [actionTypes.navigate]: (state, action) => {
        const previous = state.current;
        return Immutable({
            current: {
                location: action.location,
                action: action.action
            },
            previous
        });
    }
};

export default createReducer(handlers, DEFAULT_STATE);

export function getCurrentRoute(state) {
    return state.router.current;
}

export function getPreviousRoute(state) {
    return state.router.previous;
}

export function getPreviousUrl(state) {
    if (state.router.previous.location) {
        const { pathname, search } = state.router.previous.location;
        return pathname + search;
    }
    
    return null;
}