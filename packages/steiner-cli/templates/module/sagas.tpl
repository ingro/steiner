import { sagaCreator } from 'steiner';

import helper from 'helpers/steinerHelper';
import { actions, actionTypes } from '../actions/{{name}}';
import { selectors, DEFAULT_STATE } from '../reducers/{{name}}';
import api from '../apis/{{name}}';

const sagas = helper.createSagas('{{name}}', actionTypes, actions, api, selectors, DEFAULT_STATE);

export default sagaCreator.bootSagas(sagas, actionTypes);