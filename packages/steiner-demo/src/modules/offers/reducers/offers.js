import { reducerCreator } from 'steiner';

import helper from 'helpers/steinerHelper';
import { actionTypes } from '../actions/offers';

export const DEFAULT_STATE = helper.createDefaultState();

const handlers = helper.createHandlers(actionTypes);

export default reducerCreator.createReducer(handlers, DEFAULT_STATE);

export const selectors = reducerCreator.createSelectors('offers');