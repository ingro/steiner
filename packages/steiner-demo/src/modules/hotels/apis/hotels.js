import client from 'apis/client';
import createApi from 'steiner/dist/helpers/apiCreator';

const apis = createApi('hotels', client);

export default apis;
