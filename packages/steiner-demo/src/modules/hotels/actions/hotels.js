// import { actionCreator } from 'steiner';

import helper from 'helpers/steinerHelper';

export const actionTypes = helper.createActionTypes('hotels');
export const actions = helper.createActions('hotels', actionTypes);