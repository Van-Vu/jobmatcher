import axios from 'axios';
import Vue from "vue";
import store from '../store';
import { Utils } from '../component/utils';
import { GlobalConfig } from '../GlobalConfig';
Vue.prototype.$http = axios;
var backendUrl = process.env.NODE_ENV == 'production'
    ? GlobalConfig.accessControl.prod
    : GlobalConfig.accessControl.dev;
export var http = axios.create({
    baseURL: backendUrl
});
http.defaults.withCredentials = true;
if (process.env.NODE_ENV !== 'test') {
    http.defaults.headers.common['Access-Control-Allow-Origin'] = Utils.getCurrentHost();
}
// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (process.env.NODE_ENV !== 'production') {
        console.log('XHR request:' + config.url);
    }
    if (process.env.VUE_ENV === 'server') {
        http.defaults.headers.common = {};
        Object.keys(config.headers).map(function (key) {
            http.defaults.headers.common[key] = config.headers[key];
        });
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
// Full code: https://github.com/mzabriskie/axios/issues/690
// Add a response interceptor
http.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    var response = error.response;
    if (response) {
        Utils.handleXHRError(store, response);
    }
    // Do something with response error
    if (error.response)
        return Promise.reject(error.response);
    return Promise.reject(error);
});
export default http;
