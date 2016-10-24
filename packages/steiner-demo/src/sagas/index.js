import { fork } from 'redux-saga/effects';
import { reduxFormSaga } from 'steiner';
import axios from 'axios';

import hotels from '../modules/hotels/sagas/hotels';
import offers from '../modules/offers/sagas/offers';
import { auth } from 'steiner'

function login(data) {
    return axios.post(process.env.REACT_LOGIN_URL, data);
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
        ...hotels,
        ...offers
    ]
}