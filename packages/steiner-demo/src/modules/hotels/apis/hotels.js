import _ from 'lodash';

import helper from 'helpers/steinerHelper';
// import client from 'apis/client';

const paramsMapper = {
    q: 'q',
    _page: 'page',
    _limit: 'perPage',
    _sort: (filters) => {
        const raw = _.get(filters, 'orderKey');

        if (raw === 'position') {
            return 'position.name';
        }

        return raw;
    }
}

const apis = helper.createApi('hotels?_expand=position', null, paramsMapper);

// apis.update = function(id, data) {
//     return client({
//         url: `/wrong/${id}`,
//         method: 'patch',
//         data
//     });
// }

export default apis;
