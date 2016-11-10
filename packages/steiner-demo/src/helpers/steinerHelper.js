import { steinerHelper } from 'steiner';

import client from 'apis/client';

export default new steinerHelper({
    defaultClient: client,
    defaultPerPage: 20
});