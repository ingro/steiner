import { fork } from 'redux-saga/effects';
import { reduxFormSaga } from 'steiner';

import hotels from '../modules/hotels/sagas/hotels';
import offers from '../modules/offers/sagas/offers';

const formSaga = reduxFormSaga();

import { take, call, put } from 'redux-saga/effects';
import axios from 'axios';

const login = function(data) {
    return axios.post('https://ingruz-api-jlguviziez.now.sh/login', data);
}

const logout = function() {
    return Promise.resolve();
}

const loginSaga = function*() {
    while (true) {
        try {
            const action = yield take('LOGIN_REQUEST');

            const response = yield call(login, action.payload);

            const notification = {
                title: 'Hooray',
                message: 'Authentication successfull!',
                status: 'success'
            };

            yield put({ type: 'LOGIN_REQUEST_SUCCESS', payload: response.data, notification });
        } catch(error) {
            yield put({ type: 'LOGIN_REQUEST_FAIL', error: error.response && error.response.data ? { message: error.response.data.error } : error });
        }
    }
}

const logoutSaga = function*() {
    while (true) {
        try {
            yield take('LOGOUT_REQUEST');

            yield call(logout);
            yield put({ type: 'LOGOUT_REQUEST_SUCCESS' });
        } catch(error) {
            yield put({ type: 'LOGOUT_REQUEST_FAIL', error: error.response && error.response.data ? { message: error.response.data.error } : error });
        }
    }
}

export default function* root() {
    yield [
        ...hotels,
        ...offers,
        fork(formSaga),
        fork(loginSaga),
        fork(logoutSaga)
    ]
}