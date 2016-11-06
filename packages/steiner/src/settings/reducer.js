import Immutable from 'seamless-immutable';

import { actionTypes } from './actions';
import { createReducer } from '../helpers/reducerCreator';
import messages from '../messages/en';

export const DEFAULT_STATE = Immutable({
    language: 'en',
    translations: messages
});

const handlers = {
    [actionTypes.updateSettings]: (state, action) => {
        return Immutable({
            ...state,
            ...action.payload
        });
    },
    [actionTypes.setTranslations]: (state, action) => {
        return state.set('translations', action.payload);
    }
};

export default createReducer(handlers, DEFAULT_STATE);

export function getSettings(state) {
    return state.settings;
};

export function getLanguage(state) {
    return state.settings.language;
};

export function getTranslations(state) {
    return state.settings.translations
};