import { actionCreator } from 'steiner';

export const actionTypes = actionCreator.createActionTypes('offers');
export const actions = actionCreator.createActions('offers', actionTypes);