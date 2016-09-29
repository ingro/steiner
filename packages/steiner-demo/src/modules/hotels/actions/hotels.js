import { createActionTypes, createActions } from 'steiner/dist/helpers/actionCreator';

export const actionTypes = createActionTypes('hotels');
export const actions = createActions(actionTypes);