import { actions, actionTypes } from '../actions/offers';
import { selectors } from '../reducers/offers';
import createSagas, { bootSagas } from 'steiner/dist/helpers/sagaCreator';
import api from '../apis/offers';

const sagas = createSagas('offers', actionTypes, actions, api, selectors);

export default bootSagas(sagas, actionTypes);