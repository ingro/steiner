import { actionTypes } from '../actions/hotels';
import createReducer, { createHandlers, createSelectors, DEFAULT_STATE as baseDefaultState } from 'steiner/dist/helpers/reducerCreator';

export const DEFAULT_STATE = baseDefaultState;

const handlers = createHandlers(actionTypes);

export default createReducer(handlers, DEFAULT_STATE);

export const selectors = createSelectors('hotels');