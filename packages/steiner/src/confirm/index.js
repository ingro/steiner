import { actions, actionTypes } from './actions.js';
import saga from './saga';

export default {
    actions,
    actionTypes,
    createConfirmSaga: saga
};