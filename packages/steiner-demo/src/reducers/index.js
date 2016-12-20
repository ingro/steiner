import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { auth, routing, settings } from 'steiner';

import alberghi from '../modules/alberghi/reducers/alberghi';
import hotels from '../modules/hotels/reducers/hotels';
import offers from '../modules/offers/reducers/offers';

const rootReducer = combineReducers({
    alberghi,
    form: formReducer,
    loadingBar: loadingBarReducer,
    notifications: notificationsReducer,
    hotels,
    offers,
    router: routing.reducer,
    settings: settings.reducer,
    user: auth.reducer,
});

export default rootReducer;