import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';
import { auth } from 'steiner';

// import posts from '../modules/posts/reducers/posts';

const rootReducer = combineReducers({
    form: formReducer,
    notifications: notificationsReducer,
    // posts,
    user: auth.reducer
});

export default rootReducer;