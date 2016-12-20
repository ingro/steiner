import { showLoading, hideLoading } from 'react-redux-loading-bar';

const loadingBarMiddleware = store => next => action => {
    if (action.loadingBar) {
        store.dispatch(action.loadingBar === 'show' ? showLoading() : hideLoading());
    }

    return next(action);
};

export default loadingBarMiddleware;