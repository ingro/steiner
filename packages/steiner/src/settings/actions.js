export const UPDATE_SETTINGS  = 'steiner/UPDATE_SETTINGS';
export const SET_TRANSLATIONS = 'steiner/SET_TRANSLATIONS';

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