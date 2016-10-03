import axios from 'axios';

const client = axios.create({
    baseURL: '',
    responseType: 'json'
});

export default client;