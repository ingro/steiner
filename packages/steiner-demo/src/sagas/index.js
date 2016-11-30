import { fork, put } from 'redux-saga/effects';
import { reduxFormSaga } from 'steiner';
import axios from 'axios';
import { auth, confirm, settings } from 'steiner';

import client from 'apis/client';
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

const formSaga = reduxFormSaga();
const confirmSaga = confirm.createConfirmSaga();
const authSaga = auth.createAuthSaga({
    loginAction: login,
    logoutAction: logout,
    updateProfileAction: updateProfile,
    loginSuccessAction,
    updateProfileSuccessAction: loginSuccessAction
});

export default function* root() {
    yield [
        fork(formSaga),
        ...authSaga,
        ...confirmSaga,
        ...hotels,
        ...offers
    ];
}