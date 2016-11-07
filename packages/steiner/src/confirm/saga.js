import { take, put, select, fork } from 'redux-saga/effects';
import defaults from 'lodash/defaults';

import { actionTypes } from './actions';
import createConfirm from '../helpers/confirmCreator';

const defaultOptions = {};

export default function createConfirmSaga(options) {
    defaults(options, defaultOptions);

    const showConfirmSaga = function*() {
        while (true) {
            const action = yield take(actionTypes.showConfirmDialog);

            const payload = action.payload;

            const translations = yield select(state => state.settings.translations);

            defaults(payload, translations.messages.confirmDialog);

            yield put(createConfirm(payload));
        }
    }

    return [
        fork(showConfirmSaga)
    ];
}

