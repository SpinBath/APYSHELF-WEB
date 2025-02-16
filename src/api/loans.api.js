import axios from 'axios'

const booksApi = axios.create({
    baseURL: 'http://localhost:8000/api/loans/'
})

export const getLoans = (owner) => {
    return booksApi.get(`/?owner=${owner}`)
}

export const getAllLoans = () => {
    return booksApi.get('/')
}

export const editLoan = (id, data) => {
    return booksApi.patch(`/${id}/`, data);
}

export const createLoan = (loans) => {
    return booksApi.post('/', loans)
}

export const deleteLoan = (id) => {
    return booksApi.delete(`/${id}/`)
}