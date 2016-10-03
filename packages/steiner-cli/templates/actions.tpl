import { actionCreator } from 'steiner';

export const actionTypes = actionCreator.createActionTypes('${name}');
export const actions = actionCreator.createActions('${name}', actionTypes);