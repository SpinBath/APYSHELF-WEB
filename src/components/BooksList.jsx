import { useEffect, useState } from "react"
import { getAllBooks } from "../api/books.api"
import { BookCard, BookCardAdmin } from "./BookCard";
import "./styles/BookList.css"


export function BookList() {
    
    const [books, setBooks] = useState([]);

    const [isActive, setIsActive] = useState(false);


    useEffect(() => {
        async function loadBooks() {
            const res = await getAllBooks();
            setBooks(res.data.results);
        }
        loadBooks();

    }, []);


    const handleToggle = () => {
        setIsActive(!isActive);
    };


    return (
        <div className="bookList">

            <h1 id="titleBookList">EXPLORE OUR LIST OF BOOKS</h1>

            <div className="divSearchBooks">

                <input placeholder="Title, Author, Year, Genre" />
                Only available

                <div
                    className={`toggle-container ${isActive ? "active" : ""}`}
                    onClick={handleToggle}
                >
                    <div className="toggle-knob"></div>
                </div>

            </div>

            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    )
}