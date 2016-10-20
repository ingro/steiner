import Immutable from 'seamless-immutable';

import { actionTypes } from './actions';
import { createReducer } from '../helpers/reducerCreator';

export const DEFAULT_STATE = Immutable({
    location: { pathname: '/' },
    action: 'PUSH'
});

const handlers = {
    [actionTypes.navigate]: (state, action) => {
        return Immutable({
            location: action.location,
            action: action.action
        });
    }
};

export default createReducer(handlers, DEFAULT_STATE);

export function getRouter(state) {
    return state.router;
}