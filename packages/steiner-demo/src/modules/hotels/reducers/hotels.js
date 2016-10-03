import { reducerCreator } from 'steiner';

import { actionTypes } from '../actions/hotels';

export const DEFAULT_STATE = reducerCreator.DEFAULT_STATE;

const handlers = reducerCreator.createHandlers(actionTypes);

export default reducerCreator.createReducer(handlers, DEFAULT_STATE);

export const selectors = reducerCreator.createSelectors('hotels');