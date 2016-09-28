import { actionTypes } from '../actions/${name}';
import { selectors } from '../reducers/${name}';
import createSagas, { bootSagas } from 'helpers/sagaCreator';
import api from '../apis/${name}';

const sagas = createSagas('${name}', actionTypes, api, selectors);

export default bootSagas(sagas, actionTypes);