import axios from 'axios'

const userApi = axios.create({
    baseURL: 'http://localhost:8000/api/users/'
})

export const getAllUsers = () => {
    return userApi.get('/')
}

export const createUser = (user) => {
    return userApi.post('/', user)
}

export const deleteUser = (id) => {
    return userApi.delete(`/${id}/`)
}