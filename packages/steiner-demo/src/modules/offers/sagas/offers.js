import { sagaCreator } from 'steiner';

import { actions, actionTypes } from '../actions/offers';
import { selectors, DEFAULT_STATE } from '../reducers/offers';
import api from '../apis/offers';

const sagas = sagaCreator.createSagas('offers', actionTypes, actions, api, selectors, DEFAULT_STATE);

export default sagaCreator.bootSagas(sagas, actionTypes);