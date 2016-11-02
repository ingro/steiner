import { addNotification as notify } from 'reapop';
import _ from 'lodash';

import defaultMessages from '../messages/en';

const defaultConfirmOptions = {
    status: 'warning',
    position: 'tc'
};

export default function createConfirm(options = {}) {
    _.defaults(options, defaultConfirmOptions, defaultMessages.messages.confirmDialog);

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
            }
        ]
    });
}