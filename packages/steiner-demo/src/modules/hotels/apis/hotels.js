import client from 'apis/client';
import createApi from 'steiner/dist/helpers/apiCreator';

const apis = createApi('hotels?_expand=position', client);

// apis.update = function(id, data) {
//     return client({
//         url: `/hotelsss/${id}`,
//         method: 'patch',
//         data
//     });
// };

export default apis;
