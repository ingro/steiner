import Immutable from 'seamless-immutable';

import { actionTypes } from './actions';
import { createReducer } from '../helpers/reducerCreator';

export const DEFAULT_STATE = null;

const handlers = {
    [actionTypes.loginSuccess]: (state, action) => {
        return Immutable(action.payload);
    },
    [actionTypes.logoutSuccess]: (state, action) => {
        return DEFAULT_STATE;
    },
    [actionTypes.updateProfileSuccess]: (state, action) => {
        return Immutable({
            ...state,
            ...action.payload
        });
    }
};

export default createReducer(handlers, DEFAULT_STATE);

export function getUser(state) {
    return state.user;
}