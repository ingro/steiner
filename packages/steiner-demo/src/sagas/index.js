import { fork } from 'redux-saga/effects';
import { reduxFormSaga } from 'steiner';

import hotels from '../modules/hotels/sagas/hotels';

export default function* root() {
    yield [
        ...hotels,
        fork(reduxFormSaga)
    ]
}