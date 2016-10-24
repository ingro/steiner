import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Provider as SteinerProvider } from 'steiner';
import messages from 'steiner/lib/messages/en';

import App from './App';
import configureStore from './store/configureStore';
import rootSaga from './sagas';

import 'vivi/lib/style.css';
import './index.css';

const store = configureStore();

store.runSaga(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <SteinerProvider
            messages={messages.components}
        >
            <App />
        </SteinerProvider>
    </Provider>,
    document.getElementById('root')
);
