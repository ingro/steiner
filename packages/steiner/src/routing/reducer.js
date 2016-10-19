import { actionTypes } from './actions';
import { createReducer } from '../helpers/reducerCreator';

export const DEFAULT_STATE = {
    location: null,
    action: null
};

const handlers = {
    [actionTypes.navigate]: (state, action) => {
        return {
            location: action.location,
            action: action.action
        };
    }
};

export default createReducer(handlers, DEFAULT_STATE);