import axios from './axios';

export default {
    getProductTable(params) {
        return axios.get('/products/all', { params });
    },
    removeProduct(id) {
        return axios.delete(`/products/${id}`);
    },
    addProduct(params) {
        return axios.post('/products/add', params);
    },
    getProductDetail(id) {
        return axios.get(`/products/${id}`);
    },
    editProduct(pramas) {
        return axios.put('/products/edit', pramas);
    },
};
