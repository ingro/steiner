import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
// import { batchedSubscribe } from 'redux-batched-subscribe';
// import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';
import createSagaMiddleware, { END } from 'redux-saga';
import persistState from 'redux-localstorage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { notificationMiddleware, loadingBarMiddleware } from 'steiner';

import reducer from '../reducers';

const filter = /^redux-form/;

const loggerMiddleware = createLogger({
    collapsed: true,
    diff: true,
    predicate(getState, action) {
        return ! filter.test(action.type);
    }
});

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeWithDevTools(
    applyMiddleware(
        thunkMiddleware,
        sagaMiddleware,
        notificationMiddleware,
        loadingBarMiddleware,
        loggerMiddleware
    ),
    persistState('user', { 
        key: process.env.REACT_APP_NAME
    }),
    // batchedSubscribe(batchedUpdates)
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