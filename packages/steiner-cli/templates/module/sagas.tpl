import { sagaCreator } from 'steiner';

import { actions, actionTypes } from '../actions/${name}';
import { selectors } from '../reducers/${name}';
import api from '../apis/${name}';

const sagas = sagaCreator.createSagas('${name}', actionTypes, actions, api, selectors);

export default sagaCreator.bootSagas(sagas, actionTypes);