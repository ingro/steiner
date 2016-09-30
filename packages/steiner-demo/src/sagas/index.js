import { fork } from 'redux-saga/effects';
import { reduxFormSaga } from 'steiner';

import hotels from '../modules/hotels/sagas/hotels';

const formSaga = reduxFormSaga();

export default function* root() {
    yield [
        ...hotels,
        fork(formSaga)
    ]
}