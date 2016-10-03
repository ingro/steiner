import { actionCreator } from 'steiner';

export const actionTypes = actionCreator.createActionTypes('hotels');
export const actions = actionCreator.createActions('hotels', actionTypes);