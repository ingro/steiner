import { fork } from 'redux-saga/effects';
import { reduxFormSaga } from 'steiner';

// import posts from '../modules/posts/sagas/posts';

const formSaga = reduxFormSaga();

export default function* root() {
    yield [
        // ...posts,
        fork(formSaga)
    ]
}