import Axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken } from './memoryToken';

const axios = Axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*'
    }
});

const requestInterceptor = axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        let token = getAccessToken();
        if (token) {
            (config.headers as AxiosHeaders).set('Authorization', 'Bearer ' + token);
        }
        if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
            (config.headers as AxiosHeaders).set('Content-Type', 'multipart/form-data');
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export { axios, requestInterceptor };
