import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './store/configureStore';
import rootSaga from './sagas';

import 'vivi/lib/style.css';
import './index.css';

import history from './history';

const store = configureStore({
    router: {
        current: {
            location: history.location,
            action: history.action
        },
        previous: {
            location: null,
            action: null
        }
    }
});

store.runSaga(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);