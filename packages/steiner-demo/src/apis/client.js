import axios from 'axios';

const client = axios.create({
    baseURL: process.env.REACT_API_ROOT,
    // baseURL: 'http://localhost:3004/api',
    responseType: 'json'
});

export default client;