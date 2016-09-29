import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';

import hotels from '../modules/hotels/reducers/hotels';

const rootReducer = combineReducers({
    form: formReducer,
    notifications: notificationsReducer,
    hotels
});

export default rootReducer;