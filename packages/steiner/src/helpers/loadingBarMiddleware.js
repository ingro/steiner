import { showLoading, hideLoading } from 'react-redux-loading-bar';

const notificationMiddleware = store => next => action => {
    const result = next(action);

    if (action.loadingBar) {
        store.dispatch(action.loadingBar === 'show' ? showLoading() : hideLoading());
    }

    return result;
};

export default notificationMiddleware;