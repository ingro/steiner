import { addNotification as notify } from 'reapop';

const notificationMiddleware = store => next => action => {
    const result = next(action);

    if (action.notification) {
        store.dispatch(notify({
            title: action.notification.title,
            message: action.notification.message,
            status: action.notification.status
        }));
    }

    return result;
};

export default notificationMiddleware;