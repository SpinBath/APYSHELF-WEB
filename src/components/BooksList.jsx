import { useEffect, useState } from "react"
import { getAllBooks } from "../api/books.api"
import { BookCard, BookCardAdmin } from "./BookCard";

export function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function loadBooks() {
            const res = await getAllBooks();
            setBooks(res.data.results);
        }
        loadBooks();

    }, []);


    return (
        <div>
            {books.map((book) => (
                <BookCardAdmin key={book.id} book={book}/>
            ))}
            {books.map((book) => (
                <BookCard key={book.id} book={book}/>
            ))}
        </div>
    )
}