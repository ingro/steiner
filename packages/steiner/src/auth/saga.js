import { take, call, put, select, fork } from 'redux-saga/effects';
import _ from 'lodash';

import { actions, actionTypes } from './actions';
import { getTranslations, getLanguage } from '../settings/reducer';

export function *generateNotificationPayload(actionKey, type, messages, titles) {
    let translations;

    const language = yield select(getLanguage);

    let message = _.get(messages, `${language}.${actionKey}`);
    let title = _.get(titles, `${language}.${type}`);

    if (! message) {
        translations = yield select(getTranslations);

        message = translations.messages.notifications.auth[actionKey];
    }

    if (! title) {
        if (! translations) {
            translations = yield select(getTranslations);
        }

        title = translations.messages.notifications.titles[type];
    }

    return {
        title,
        message,
        status: type === 'success' ? 'success' : 'error'
    };
}

export default function createAuthSaga(options = {}) {
    const messages = options.messages || {};
    const titles = options.notificationTitles || {};

    const loginSaga = function*() {
        while (true) {
            try {
                const action = yield take(actionTypes.login);

                const response = yield call(options.loginAction, action.payload);

                const notification = yield call(generateNotificationPayload, 'loginSuccess', 'success', messages, titles);

                yield put(actions.loginRequestSuccess(response.data, notification));

                if (options.loginSuccessAction) {
                    yield call(options.loginSuccessAction, response.data);
                }
            } catch(error) {
                const errorPayload = error.response && error.response.data ? { message: error.response.data.error } : error;

                yield put(actions.loginRequestFail(errorPayload));

                if (options.logoutSuccessAction) {
                    yield call(options.logoutSuccessAction);
                }
            }
        }
    };

    const logoutSaga = function*() {
        while (true) {
            try {
                yield take(actionTypes.logout);

                yield call(options.logoutAction);
                yield put(actions.logoutRequestSuccess());
            } catch(error) {
                const errorPayload = error.response && error.response.data ? { message: error.response.data.error } : error;
                yield put(actions.logoutRequestFail(errorPayload));
            }
        }
    };

    const updateProfileSaga = function*() {
        while (true) {
            try {
                const action = yield take(actionTypes.updateProfile);

                const user = yield select(state => state.user);

                const response = yield call(options.updateProfileAction, user.id, action.payload);

                const notification = yield call(generateNotificationPayload, 'profileUpdateSuccess', 'success', messages, titles);

                yield put(actions.updateProfileSuccess(response.data, notification));

                if (options.updateProfileSuccessAction) {
                    yield call(options.updateProfileSuccessAction, response.data);
                }
            } catch(error) {
                const errorPayload = error.response && error.response.data ? { message: error.response.data.error } : error;

                const notification = yield call(generateNotificationPayload, 'profileUpdateFail', 'error', messages, titles);

                yield put(actions.updateProfileFail(errorPayload, notification));
            }
        }
    };

    return [
        fork(loginSaga),
        fork(logoutSaga),
        fork(updateProfileSaga)
    ];
}

