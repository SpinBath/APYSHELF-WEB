import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom";
import { isStaff } from "./ProtectedRoute";
import { getAllBooks, getAvailableBooks, getSearchBook, getSearchBookAvailable } from "../api/books.api"
import { BookCard, BookCardAdmin } from "./BookCard";
import "./styles/BookList.css"


export function BookList() {

    const [isUserStaff, setIsUserStaff] = useState(false);

    const [books, setBooks] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const { register, watch } = useForm();

    const search = watch("search");

    useEffect(() => {
        async function fetchStaffStatus() {
            const staffStatus = await isStaff();
            setIsUserStaff(staffStatus);
        }

        fetchStaffStatus();
    }, []);


    useEffect(() => {
        async function loadBooks() {
            if (isActive) {
                const res = await getAvailableBooks();
                setBooks(res.data.results);
            } else {
                const res = await getAllBooks();
                setBooks(res.data.results);
            }
        }

        loadBooks();
    }, [isActive]);

    useEffect(() => {
        async function fetchBooks() {
            let res;

            if (search) {
                if (isActive) {
                    res = await getSearchBookAvailable(search);
                } else {
                    res = await getSearchBook(search);
                }
            } else {
                if (isActive) {
                    res = await getAvailableBooks();
                } else {
                    res = await getAllBooks();
                }
            }

            setBooks(res.data.results);
        }

        fetchBooks();
    }, [isActive, search]);

    const handleToggle = () => {
        setIsActive((prevState) => !prevState);
    };

    if (isUserStaff) {
        return (
            <div className="bookList">

                <h1 id="titleBookList">EXPLORE OUR LIST OF BOOKS</h1>

                <div className="divSearchBooks">
                    <form>
                        <input placeholder="Title, Author, Year, Genre" {...register("search")} />
                    </form>
                    Only available

                    <div
                        className={`toggle-container ${isActive ? "active" : ""}`}
                        onClick={handleToggle}
                    >
                        <div className="toggle-knob"></div>
                    </div>

                </div>

                <table>
                    <thead>
                        <Link to="/books-create"><button id="btn-createBook">+</button></Link>

                        <tr>
                            <th id="th-title">Title</th>
                            <th id="th-author">Author</th>
                            <th id="th-date">Date</th>
                            <th id="th-status">Status</th>
                            <th id="th-options">Options</th>
                        </tr>

                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <BookCardAdmin key={book.id} book={book} />
                        ))}
                    </tbody>
                </table>


            </div>
        )
    }

    return (
        <div className="bookList">

            <h1 id="titleBookList">EXPLORE OUR LIST OF BOOKS</h1>

            <div className="divSearchBooks">
                <form>
                    <input placeholder="Title, Author, Year, Genre" {...register("search")} />
                </form>
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

