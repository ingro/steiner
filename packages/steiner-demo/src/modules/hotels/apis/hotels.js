import client from 'apis/client';
import { apiCreator } from 'steiner';

const apis = apiCreator('hotels?_expand=position', client);

// apis.update = function(id, data) {
//     return client({
//         url: `/hotelsss/${id}`,
//         method: 'patch',
//         data
//     });
// };

export default apis;
