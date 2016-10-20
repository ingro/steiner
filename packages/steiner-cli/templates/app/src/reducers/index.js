import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { auth, routing } from 'steiner';

// import posts from '../modules/posts/reducers/posts';

const rootReducer = combineReducers({
    form: formReducer,
    loadingBar: loadingBarReducer,
    notifications: notificationsReducer,
    // posts,
    user: auth.reducer,
    router: routing.reducer
});

export default rootReducer;