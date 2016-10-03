import { sagaCreator } from 'steiner';

import { actions, actionTypes } from '../actions/hotels';
import { selectors } from '../reducers/hotels';
import api from '../apis/hotels';

const sagas = sagaCreator.createSagas('hotels', actionTypes, actions, api, selectors);

export default sagaCreator.bootSagas(sagas, actionTypes);