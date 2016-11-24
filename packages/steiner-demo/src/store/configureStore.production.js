import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { batchedSubscribe } from 'redux-batched-subscribe';
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';
import createSagaMiddleware, { END } from 'redux-saga';
import persistState from 'redux-localstorage';
import { notificationMiddleware, loadingBarMiddleware, createAuthErrorMiddleware } from 'steiner';
import Immutable from 'seamless-immutable';

import reducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
    applyMiddleware(
        thunkMiddleware,
        sagaMiddleware,
        createAuthErrorMiddleware(),
        apiErrorMiddleware,
        notificationMiddleware,
        loadingBarMiddleware
    ),
    persistState(['user', 'settings'], { 
        key: process.env.REACT_APP_NAME,
        deserialize: data => {
            return Immutable(JSON.parse(data));
        }
    }),
    batchedSubscribe(batchedUpdates)
);

export default function configureStore(preloadedState = {}) {
    const store = createStore(
        reducer,
        preloadedState,
        enhancer
    );

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    return store;
}