import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';
import { auth } from 'steiner';

import hotels from '../modules/hotels/reducers/hotels';
import offers from '../modules/offers/reducers/offers';

const rootReducer = combineReducers({
    form: formReducer,
    notifications: notificationsReducer,
    hotels,
    offers,
    user: auth.reducer
});

export default rootReducer;