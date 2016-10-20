import { sagaCreator } from 'steiner';

import { actions, actionTypes } from '../actions/hotels';
import { selectors, DEFAULT_STATE } from '../reducers/hotels';
import api from '../apis/hotels';

const sagas = sagaCreator.createSagas('hotels', actionTypes, actions, api, selectors, DEFAULT_STATE);

export default sagaCreator.bootSagas(sagas, actionTypes);