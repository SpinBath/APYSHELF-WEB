import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createUser = (user) => {
    return apiClient.post('/signup', user);
};

export const loginUser = (user) => {
    return apiClient.post('/login', user);
};

export const infoUser = (token) => {
    return apiClient.get('/test_token', {
        headers: {
            'Authorization': `Token ${token}`,
        },
    });
};

export const editUser = (id, data) => {
    return apiClient.patch(`/api/users/${id}/`, data);
};
