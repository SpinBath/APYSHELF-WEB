import { useEffect, useState } from "react"
import { getAllBooks } from "../api/books.api"
import { BookCard } from "./BookCard";
import "./styles/BookList.css"


export function BookList() {
    
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function loadBooks() {
            const res = await getAllBooks();
            console.log(res)
            setBooks(res.data.results);
        }
        loadBooks();

    }, []);


    const [isActive, setIsActive] = useState(false);

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

