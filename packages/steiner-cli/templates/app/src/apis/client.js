import axios from 'axios';

const client = axios.create({
    baseURL: process.env.REACT_APP_API_ROOT,
    responseType: 'json'
});

export default client;