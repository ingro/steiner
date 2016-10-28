export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

export function updateSettings(settings) {
    return {
        type: UPDATE_SETTINGS,
        payload: settings
    };
}

export const actions = {
    updateSettings
};

export const actionTypes = {
    updateSettings: UPDATE_SETTINGS
};