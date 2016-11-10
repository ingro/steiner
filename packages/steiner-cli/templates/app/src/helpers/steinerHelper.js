import { steinerHelper } from 'steiner';
import enMessages from 'steiner/lib/messages/en';
import itMessages from 'steiner/lib/messages/it';

import client from 'apis/client';

export default new steinerHelper({
    defaultClient: client,
    defaultPerPage: 20,
    defaultMessages: {
        en: enMessages,
        it: itMessages
    }
});