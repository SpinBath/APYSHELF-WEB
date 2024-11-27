import axios from 'axios'

const booksApi = axios.create({
    baseURL: 'http://localhost:8000/api/books/'
})

export const getAllBooks = () => {
    return booksApi.get('/')
}

export const createBooks = (books) => {
    return booksApi.post('/', books)
}