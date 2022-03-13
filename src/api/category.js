import axios from './axios';

export default {
    getCategoryList() {
        return axios.get('/category/all');
    },
    addCategory(params) {
        return axios.get('/category/add', params);
    },
    editCategory(params) {
        return axios.put('/category/edit', params);
    },
    removeCategory(id) {
        return axios.delete(`/category/${id}`);
    },
};
