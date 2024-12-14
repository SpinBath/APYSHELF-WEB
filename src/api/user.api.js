import axios from 'axios'

const createUserUrl = axios.create({
    baseURL: 'http://127.0.0.1:8000/signup'
})

const loginUserUrl = axios.create({
    baseURL: 'http://127.0.0.1:8000/login'
})

export const createUser = (user) => {
    return createUserUrl.post('', user)
}

export const loginUser = (user) => {
    return loginUserUrl.post('', user)
}

