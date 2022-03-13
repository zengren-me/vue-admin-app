import axios from 'axios';
import store from '../store';

 const instance = axios.create({
     baseURL: 'https://mallapi.duyiedu.com/',
 });

 instance.interceptors.request.use((request) => {
    if (request.url.includes('passport')) {
       return request;
    }
       return {
          ...request,
          params: {
             ...request.params,
             appkey: store.state.user.appkey,
          },
       };
 }, (error) => Promise.reject(error));

 instance.interceptors.response.use((response) => {
    if (response.status === 'fail') {
       return Promise.reject(response.data.msg);
    }
    return response.data;
 }, (error) => Promise.reject(error));

 export default instance;
