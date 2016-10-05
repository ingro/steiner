import { addNotification as notify } from 'reapop';
import _ from 'lodash';

const defaultConfirmOptions = {
    title: 'Warning',
    status: 'warning',
    position: 'tc',
    btn_primary_text: 'Confirm',
    btn_secondary_text: 'Cancel'
};

export default function createConfirm(options = {}) {
    _.defaults(options, defaultConfirmOptions);

    return notify({
        title: options.title,
        message: options.message,
        status: options.status,
        dismissible: false,
        dismissAfter: 0,
        position: options.position,
        buttons: [
            {
                name: options.btn_primary_text,
                primary: true,
                onClick: () => {
                    options.onSuccess();
                }
            },
            {
                name: options.btn_secondary_text,
                primary: false
            },
        ]
    });
}