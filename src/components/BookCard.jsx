import { useNavigate } from "react-router-dom"
import { deleteBook } from '../api/books.api'




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
        <div style={{ background: "black" }}>
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <hr />
        </div >
    );
}
