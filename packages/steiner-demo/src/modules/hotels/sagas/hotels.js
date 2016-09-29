import { actions, actionTypes } from '../actions/hotels';
import { selectors } from '../reducers/hotels';
import createSagas, { bootSagas } from 'steiner/dist/helpers/sagaCreator';
import api from '../apis/hotels';

const sagas = createSagas('hotels', actionTypes, actions, api, selectors);

export default bootSagas(sagas, actionTypes);