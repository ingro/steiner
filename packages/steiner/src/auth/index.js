import { actions, actionTypes } from './actions.js';
import reducer from './reducer';
import saga from './saga';

export default {
    actions,
    actionTypes,
    reducer,
    createAuthSaga: saga
};