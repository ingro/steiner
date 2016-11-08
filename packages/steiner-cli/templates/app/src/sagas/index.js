import { fork } from 'redux-saga/effects';
import { reduxFormSaga } from 'steiner';
import axios from 'axios';
import { auth, confirm } from 'steiner';

// import posts from '../modules/posts/sagas/posts';
import client from 'apis/client';

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

const formSaga = reduxFormSaga();
const confirmSaga = confirm.createConfirmSaga();
const authSaga = auth.createAuthSaga({
    loginAction: login,
    logoutAction: logout,
    updateProfileAction: updateProfile
});

export default function* root() {
    yield [
        fork(formSaga),
        ...authSaga,
        ...confirmSaga,
        // ...posts,
    ];
}