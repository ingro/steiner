export const SHOW_CONFIRM_DIALOG = 'steiner/SHOW_CONFIRM_DIALOG';

export function showConfirmDialog(options) {
    return {
        type: SHOW_CONFIRM_DIALOG,
        payload: options
    };
}

export const actions = {
    showConfirmDialog
};

export const actionTypes = {
    showConfirmDialog: SHOW_CONFIRM_DIALOG
};