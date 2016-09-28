import { createActionTypes, createActions } from 'helpers/actionCreator';

export const actionTypes = createActionTypes('${name}');
export const actions = createActions(actionTypes);