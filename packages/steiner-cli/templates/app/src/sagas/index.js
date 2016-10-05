import { fork } from 'redux-saga/effects';
import { reduxFormSaga } from 'steiner';
import axios from 'axios';

// import posts from '../modules/posts/sagas/posts';
import { auth } from 'steiner'

function login(data) {
    return axios.post('login', data);
}

function logout() {
    return Promise.resolve();
}

const formSaga = reduxFormSaga();
const authSaga = auth.createAuthSaga({
    loginAction: login,
    logoutAction: logout
});

export default function* root() {
    yield [
        fork(formSaga),
        ...authSaga,
        // ...posts,
    ]
}