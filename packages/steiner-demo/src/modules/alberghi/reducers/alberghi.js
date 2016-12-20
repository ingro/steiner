import { reducerCreator } from 'steiner';

import helper from 'helpers/steinerHelper';
import { actionTypes } from '../actions/alberghi';

export const DEFAULT_STATE = helper.createDefaultState({
    list: {
        filters: {
            categoryId: null,
            positionId: null
        }
    }
});

const handlers = helper.createHandlers(actionTypes);

export default reducerCreator.createReducer(handlers, DEFAULT_STATE);

export const selectors = reducerCreator.createSelectors('alberghi');