import { reducerCreator } from 'steiner';

import helper from 'helpers/steinerHelper';
import { actionTypes } from '../actions/hotels';

export const DEFAULT_STATE = reducerCreator.DEFAULT_STATE;

const handlers = helper.createHandlers(actionTypes);

export default reducerCreator.createReducer(handlers, DEFAULT_STATE);

export const selectors = reducerCreator.createSelectors('hotels');