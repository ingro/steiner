import { actions, actionTypes } from '../actions/${name}';
import { selectors } from '../reducers/${name}';
import createSagas, { bootSagas } from 'steiner/dist/helpers/sagaCreator';
import api from '../apis/${name}';

const sagas = createSagas('${name}', actionTypes, actions, api, selectors);

export default bootSagas(sagas, actionTypes);