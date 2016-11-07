import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import persistState from 'redux-localstorage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { notificationMiddleware, loadingBarMiddleware } from 'steiner';
import Immutable from 'seamless-immutable';

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
    persistState(['user', 'settings'], { 
        key: process.env.REACT_APP_NAME,
        deserialize: data => {
            return Immutable(JSON.parse(data));
        }
    }),
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