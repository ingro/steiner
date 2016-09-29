import { createActionTypes, createActions } from 'steiner/dist/helpers/actionCreator';

export const actionTypes = createActionTypes('${name}');
export const actions = createActions(actionTypes);