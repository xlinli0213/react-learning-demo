import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
});

// you could set request and response interceptors in there

export default service;
