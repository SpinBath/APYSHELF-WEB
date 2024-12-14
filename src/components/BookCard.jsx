import { useNavigate } from "react-router-dom"
import { deleteBook } from '../api/books.api'
import "./styles/BookCards.css"



export function BookCardAdmin({ book }) {

    const navigate = useNavigate();

    return (
        <div style={{ background: "black" }}>
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <button
                onClick={async () => {
                    const accepted = window.confirm('are you sure?')
                    if (accepted) {
                        await deleteBook(book.id);
                        navigate("/");
                    }
                }}
            >
                Delete
            </button>
            <hr />
        </div >
    );
}


export function BookCard({ book }) {

    return (
        <div id="bookCard">

            <div id="divImageBookCard">
                <img />
            </div>
            <div id="divInfoBookCard">
                <div id="divinfo">
                    <p id="ptitlebook">{book.title}</p>
                    <p id="pgenrebook">{book.genre}, {book.date}</p>
                    <p id="pauthorbook">{book.author}</p>
                    <p id="pdescriptionbook">{book.description}</p>
                </div>
                <div id="divbutton">
                    <button>Request loan</button>Available
                </div>
            </div>
        </div >
    );
}
