import axios from './axios';

export default {
    login(params) {
        return axios.post('/passport/login', params);
    },
    register(params) {
        return axios.post('/passport/logon', params);
    },
    getCode(email) {
        return axios.post('/passport/getCode', email);
    },
    editUser(params) {
        return axios.put('/passport/changeUserInfo', params);
    },
};
