import { addNotification as notify } from 'reapop';

import { actions } from '../auth/actions';
import { getLanguage, getTranslations } from '../settings/reducer';

function createAuthErrorMiddleware(options = {}) {
    const authErrorMiddleware = store => next => action => {
        if (action.error && action.error.response && action.error.response.status === 401) {
            let title;
            let message;

            const state = store.getState();

            if (options.messages) {
                const language = getLanguage(state);

                title = options.messages[language].title;
                message = options.messages[language].message;
            } else {
                const translations = getTranslations(state);

                title = translations.messages.notifications.titles.fail;
                message = translations.messages.notifications.authError;
            }

            store.dispatch(notify({
                title,
                message,
                status: 'error',
                position: 'tc',
                dismissAfter: 0
            }));

            store.dispatch(actions.logoutRequestSuccess());
        }

        return next(action);
    };

    return authErrorMiddleware;  
}

export default createAuthErrorMiddleware;
