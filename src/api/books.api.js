import axios from 'axios'

const booksApi = axios.create({
    baseURL: 'http://localhost:8000/api/books/'
})

export const getAvailableBooks = () => {
    return booksApi.get(`/?status=Available`)
}

export const getSearchBook = (search) => {
    return booksApi.get(`/?search=${search}`)
}

export const getSearchBookAvailable = (search) => {
    return booksApi.get(`/?search=${search}&status=Available`)
}

export const getAllBooks = () => {
    return booksApi.get('/')
}

export const getBook = (id) => {
    return booksApi.get(`/${id}`);
}

export const editBook = (id, data) => {
    return booksApi.patch(`/${id}/`, data);
}

export const createBooks = (books) => {
    return booksApi.post('/', books)
}

export const deleteBook = (id) => {
    return booksApi.delete(`/${id}/`)
}