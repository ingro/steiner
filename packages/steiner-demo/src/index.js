import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TranslatorProvider from 'vivi/lib/TranslatorProvider';
import viviMessages from 'vivi/lib/messages/it';
import messages from 'steiner/lib/messages/it';

import App from './App';
import configureStore from './store/configureStore';
import rootSaga from './sagas';

import 'vivi/lib/style.css';
import './index.css';

import history from './history';

const store = configureStore({
    router: {
        location: history.location,
        action: history.action
    }
});

store.runSaga(rootSaga);

const translations = {
    ...viviMessages,
    steiner: {
        ...messages.components
    } 
};

ReactDOM.render(
    <Provider store={store}>
        <TranslatorProvider
            locale="it"
            messages={translations}
        >
            <App />
        </TranslatorProvider>
    </Provider>,
    document.getElementById('root')
);
