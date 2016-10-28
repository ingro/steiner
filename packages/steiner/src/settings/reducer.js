import Immutable from 'seamless-immutable';

import { actionTypes } from './actions';
import { createReducer } from '../helpers/reducerCreator';

export const DEFAULT_STATE = Immutable({
    language: 'en'
});

const handlers = {
    [actionTypes.updateSettings]: (state, action) => {
        return Immutable({
            ...state,
            ...action.payload
        });
    }
};

export default createReducer(handlers, DEFAULT_STATE);

export function getSettings(state) {
    return state.settings;
}