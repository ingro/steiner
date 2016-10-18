// import { apiCreator } from 'steiner';
import _ from 'lodash';

import helper from 'helpers/steinerHelper';

const paramsMapper = {
    _sort: (filters) => {
        const raw = _.get(filters, 'order.key');

        if (raw === 'position') {
            return 'position.name';
        }

        return raw;
    }
}

const apis = helper.createApi('hotels?_expand=position', null, paramsMapper);

export default apis;
