import { sagaCreator } from 'steiner';

import { actions, actionTypes } from '../actions/offers';
import { selectors } from '../reducers/offers';
import api from '../apis/offers';

const sagas = sagaCreator.createSagas('offers', actionTypes, actions, api, selectors);

export default sagaCreator.bootSagas(sagas, actionTypes);