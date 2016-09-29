import axios from 'axios';

const client = axios.create({
    baseURL: 'https://ingruz-api-aqvckpkjre.now.sh/api',
    responseType: 'json'
});

export default client;