import { createActionTypes, createActions } from 'steiner/dist/helpers/actionCreator';

export const actionTypes = createActionTypes('offers');
export const actions = createActions('offers', actionTypes);