export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const SET_TRANSLATIONS = 'SET_TRANSLATIONS';

export function updateSettings(settings) {
    return {
        type: UPDATE_SETTINGS,
        payload: settings
    };
}

export function setTranslations(translations) {
    return {
        type: SET_TRANSLATIONS,
        payload: translations
    };
}

export const actions = {
    updateSettings,
    setTranslations
};

export const actionTypes = {
    updateSettings: UPDATE_SETTINGS,
    setTranslations: SET_TRANSLATIONS
};