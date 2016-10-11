import { apiCreator } from 'steiner';
import _ from 'lodash';

import client from 'apis/client';

const paramsMapper = {
    _sort: (filters) => {
        const raw = _.get(filters, 'order.key');

        if (raw === 'position') {
            return 'position.name';
        }

        return raw;
    }
}

const apis = apiCreator('hotels?_expand=position', client, paramsMapper);

// apis.update = function(id, data) {
//     return client({
//         url: `/hotelsss/${id}`,
//         method: 'patch',
//         data
//     });
// };

export default apis;
