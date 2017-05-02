import { all, fork, put } from 'redux-saga/effects';
import { reduxFormSaga } from 'steiner';
import axios from 'axios';
import { auth, confirm, settings } from 'steiner';

import client from 'apis/client';
import alberghi from '../modules/alberghi/sagas/alberghi';
import hotels from '../modules/hotels/sagas/hotels';
import offers from '../modules/offers/sagas/offers';

function login(data) {
    return axios.post(process.env.REACT_APP_LOGIN_URL, data);
}

function logout() {
    return Promise.resolve();
}

function updateProfile(id, data) {
    return client({
        url: `/users/${id}`,
        method: 'patch',
        data
    });
}

function *loginSuccessAction(loginData) {
    const action = settings.actions.updateSettings({
        language: loginData.language
    });

    yield put(action);
}

// function createErrorPayload(action) {
//     let payload = {};

//     if (action.error.validationErrors) {
//         payload = action.error.validationErrors;
//     }

//     if (action.error.message) {
//         payload._error = action.error.message;
//     }

//     return payload;
// }

const formSaga = reduxFormSaga(/*createErrorPayload*/);
const confirmSaga = confirm.createConfirmSaga();
const authSaga = auth.createAuthSaga({
    loginAction: login,
    logoutAction: logout,
    updateProfileAction: updateProfile,
    loginSuccessAction,
    updateProfileSuccessAction: loginSuccessAction
});

export default function* root() {
    yield all([
        fork(formSaga),
        ...authSaga,
        ...confirmSaga,
        ...alberghi,
        ...hotels,
        ...offers
    ]);
}