import { fork } from 'redux-saga/effects';
import { reduxFormSaga } from 'steiner';

import hotels from '../modules/hotels/sagas/hotels';
import offers from '../modules/offers/sagas/offers';

const formSaga = reduxFormSaga();

export default function* root() {
    yield [
        ...hotels,
        ...offers,
        fork(formSaga)
    ]
}