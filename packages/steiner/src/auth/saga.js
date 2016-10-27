import { take, call, put, select, fork } from 'redux-saga/effects';

import { actions, actionTypes } from './actions';

export default function createAuthSaga(options) {
    const loginSaga = function*() {
        while (true) {
            try {
                const action = yield take(actionTypes.login);

                const response = yield call(options.loginAction, action.payload);

                yield put(actions.loginRequestSuccess(response.data));
            } catch(error) {
                yield put(actions.loginRequestFail(error));
            }
        }
    }

    const logoutSaga = function*() {
        while (true) {
            try {
                yield take(actionTypes.logout);

                yield call(options.logoutAction);
                yield put(actions.logoutRequestSuccess());
            } catch(error) {
                yield put(actions.logoutRequestFail(error));
            }
        }
    }

    const updateProfileSaga = function*() {
        while (true) {
            try {
                const action = yield take(actionTypes.updateProfile);

                const user = yield select(state => state.user);

                const response = yield call(options.updateProfileAction, user.id, action.payload);

                yield put(actions.updateProfileSuccess(response.data));
            } catch(error) {
                yield put(actions.updateProfileFail(error));
            }
        }
    }

    return [
        fork(loginSaga),
        fork(logoutSaga),
        fork(updateProfileSaga)
    ];
}

