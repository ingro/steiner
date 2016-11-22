import helper from 'helpers/steinerHelper';

const actionTypesObj = helper.createActionTypes('offers');
const actionsObj = helper.createActions('offers', actionTypesObj);

export const actionTypes = actionTypesObj;
export const actions = actionsObj;