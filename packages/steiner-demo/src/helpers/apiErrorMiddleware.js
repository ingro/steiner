import { auth } from 'steiner';
import { addNotification as notify } from 'reapop';

const apiErrorMiddleware = store => next => action => {
    if (action.error && action.error.response && action.error.response.status === 401) {
        store.dispatch(notify({
            title: 'Error!',
            message: 'Session expired, please login again!',
            status: 'error',
            position: 'tc',
            dismissAfter: 0
        }));

        store.dispatch(auth.actions.logoutRequestSuccess());
    }

    return next(action);
};

export default apiErrorMiddleware;
