import { sagaCreator } from 'steiner';

import helper from 'helpers/steinerHelper';
import { actions, actionTypes } from '../actions/alberghi';
import { selectors, DEFAULT_STATE } from '../reducers/alberghi';
import api from '../apis/alberghi';

const sagas = helper.createSagas('alberghi', actionTypes, actions, api, selectors, DEFAULT_STATE);

const defaultSagas = sagaCreator.bootSagas(sagas, actionTypes);

export default [
    ...defaultSagas
];