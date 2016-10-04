import axios from 'axios';

const client = axios.create({
    baseURL: 'https://ingruz-api-jlguviziez.now.sh/api',
    responseType: 'json'
});

export default client;