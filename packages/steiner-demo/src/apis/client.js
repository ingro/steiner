import axios from 'axios';

const client = axios.create({
    // baseURL: 'https://ingruz-api-jlguviziez.now.sh/api',
    baseURL: 'http://localhost:3004/api',
    responseType: 'json'
});

export default client;