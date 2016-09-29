import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { batchedSubscribe } from 'redux-batched-subscribe';
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';
import createSagaMiddleware, { END } from 'redux-saga';

import reducer from './reducers';

const devtools = window.devToolsExtension || (() => noop => noop);

const filter = /^redux-form/;

const loggerMiddleware = createLogger({
    collapsed: true,
    predicate(getState, action) {
        return ! filter.test(action.type);
    }
});

const sagaMiddleware = createSagaMiddleware();

import { addNotification as notify } from 'reapop';

const notiMiddleware = store => next => action => {
    const result = next(action);

    if (action.notification) {
        store.dispatch(notify({
            title: action.notification.title,
            message: action.notification.message,
            status: action.notification.status
        }));
    }

    return result;
};

const enhancer = compose(
    applyMiddleware(
        thunkMiddleware,
        sagaMiddleware,
        notiMiddleware,
        loggerMiddleware
    ),
    devtools(),
    batchedSubscribe(batchedUpdates)
);

const store = createStore(
    reducer,
    {},
    enhancer
);

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);

export default store;