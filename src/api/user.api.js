import axios from 'axios'

const createUserUrl = axios.create({
    baseURL: 'http://127.0.0.1:8000/signup'
})

const loginUserUrl = axios.create({
    baseURL: 'http://127.0.0.1:8000/login'
})

const infoUserUrl = axios.create({
    baseURL: 'http://127.0.0.1:8000/test_token'
})

export const createUser = (user) => {
    return createUserUrl.post('', user)
}

export const loginUser = (user) => {
    return loginUserUrl.post('', user)
}

export const infoUser = (token) => {
    return infoUserUrl.get('', {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }

    })
}


