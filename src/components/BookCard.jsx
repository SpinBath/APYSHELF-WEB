import { useNavigate, Link, useParams } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react';

import { infoUser } from "../api/user.api";
import { createBooks, getBook, editBook, deleteBook } from '../api/books.api'
import { createLoan } from "../api/loans.api"

import "./styles/BookCards.css"
import "./styles/BookForms.css"



export function BookCardAdmin({ book }) {

    const onDelete = async () => {

        const accepted = window.confirm('are you sure?')

        if (accepted) {
            await deleteBook(book.id);
            window.location.reload();
        }

    }

    return (

        <tr id="bookCardAdmin">
            <td id="td-title">{book.title}</td>
            <td id="td-author">{book.author}</td>
            <td id="td-date">{book.date}</td>
            <td id="td-status">{book.status}</td>
            <td id="td-genre"><Link to={`/books-edit/${book.id}`}><button id="btn-edit">🔧</button></Link><button id="btn-erase" onClick={onDelete}>🗑️</button></td>
        </tr>

    );
}


export function BookCard({ book }) {

    return (
        <div id="bookCard">

            <div id="divImageBookCard">
                <img src="../src/img/book-icon.png" />
            </div>
            <div id="divInfoBookCard">
                <div id="divinfo">
                    <p id="ptitlebook">{book.title}</p>
                    <p id="pgenrebook">{book.genre}, {book.date}</p>
                    <p id="pauthorbook">- {book.author} -</p>
                    <p id="pdescriptionbook">{book.description}</p>
                </div>
                <div id="divbutton">
                    <Link to={`/books-request/${book.id}`}><button id="btn-RequestLoan">Request loan</button></Link>{book.status}<div id="icon"
                        style={{
                            backgroundColor:
                                book.status === "Available"
                                    ? "#4caf50"
                                    : book.status === "On Hold"
                                        ? "orange"
                                        : book.status === "Not Available"
                                            ? "#ff3c3c"
                                            : "grey"
                        }} />
                </div>
            </div>
        </div >
    );
}


export function BookCardRequest() {

    const [user, setUsers] = useState([]);
    const [book, setData] = useState(null);

    const { register, handleSubmit, setValue, setError, watch, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();


    const borrowDate = watch("borrow_date");
    const today = new Date().toISOString().split('T')[0];
    const minDate = new Date();

    useEffect(() => {
        async function loadUser() {
            try {
                const userData = await infoUser(localStorage.getItem("token"));
                setUsers(userData.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        loadUser();
    }, []);

    useEffect(() => {
        if (borrowDate) {

            const asd = new Date(borrowDate)
            asd.setDate(asd.getDate() + 30)

            document.getElementById('input-date2').min = borrowDate
            document.getElementById('input-date2').max = asd.toISOString().split('T')[0]
            document.getElementById('input-date2').value = ''

        }
    }, [borrowDate]);

    useEffect(() => {
        async function fetchData() {
            if (id) {
                try {
                    const res = await getBook(id);
                    setData(res.data);
                } catch (error) {
                    console.error('Error fetching book:', error);
                }
            }
        }
        fetchData();
    }, [id]);


    if (!book) {
        return <div></div>;
    }

    const onSubmit = handleSubmit(async data => {

        try {
            const res = await createLoan(data);
            const counts = book.orders_count + 1

            if (res.status === 201) {
                const updatedData = {
                    orders_count: counts,
                    status: "On hold"
                };

                const ed = await editBook(book.id, updatedData);
                console.log('Libro actualizado:', ed.data);

                navigate("/loans");
            } else {
                console.error('Error al crear el préstamo: Estado incorrecto', res.status);
            }
        } catch (error) {
            console.error('Error durante la creación o actualización:', error);
        }
    });


    return (
        <form id="bookCardRequest" onSubmit={onSubmit}>
            <div id="divinfo">
                <input {...register("book")} defaultValue={book.id} style={{ display: "none" }} />
                <input {...register("book_title")} defaultValue={book.title} style={{ display: "none" }} />
                <input {...register("owner")} defaultValue={user.id} style={{ display: "none" }} />
                <p id="ptitlebook">{book.title}</p>
                <p id="pgenrebook">{book.genre}, {book.date}</p>
                <p id="pauthorbook">{book.author}</p>
                <label id="label-date">Date of borrowing</label>
                <input id="input-date1" type="date" min={today} {...register("borrow_date")} required /><br />
                <label id="label-date">Return date</label>
                <input id="input-date2" type="date" min={minDate} {...register("return_date")} required />
            </div>
            <div id="divbutton">
                <button type="submit" id="btn-accept">Accept</button>
                <button type="button" id="btn-back"><Link to="/books">Back</Link></button>
            </div>
        </form>
    );
}


export function AddBookForm() {

    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const onSubmit = async (data) => {
        console.log("Datos del libro: ", data);
        const res = await createBooks(data)

        if (res.status === 201) {
            navigate("/books")
        } else {
            console.log(res)
        }
    };

    return (
        <div id="bookForm">
            <h1>Create Book</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="div-inputs">
                    <input
                        type="text"
                        id="title"
                        placeholder="Título del libro"
                        {...register("title", { required: "El título es obligatorio", maxLength: 200 })}
                        required
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>

                <div className="div-inputs">
                    <input
                        type="text"
                        id="author"
                        placeholder="Nombre del autor"
                        {...register("author", { required: "El autor es obligatorio", maxLength: 100 })}
                        required
                    />
                    {errors.author && <p>{errors.author.message}</p>}
                </div>

                <div className="div-inputs-date">
                    <p>Fecha de publicacion: </p>
                    <input
                        type="date"
                        id="date"
                        {...register("date", { required: "La fecha es obligatoria" })}
                        required
                    />
                    {errors.date && <p>{errors.date.message}</p>}
                </div>

                <div className="div-inputs">
                    <input
                        type="text"
                        id="genre"
                        placeholder="Género literario"
                        {...register("genre", { required: "El género es obligatorio", maxLength: 50 })}
                        required
                    />
                    {errors.genre && <p>{errors.genre.message}</p>}
                </div>

                <div className="div-inputs">
                    <textarea
                        id="description"
                        placeholder="Descripción del libro (máx. 300 caracteres)"
                        {...register("description", { maxLength: 300 })}
                    ></textarea>
                    {errors.description && <p>{errors.description.message}</p>}
                </div>



                <Link to="/books"><button id="btn-back" type="button">Back</button></Link>
                <button id="btn-create" type="submit">Create Book</button>

            </form>
        </div>
    );
};

export function EditBookForm() {

    const navigate = useNavigate();

    const { id } = useParams();
    const [book, setBook] = useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await getBook(id);
                setBook(res.data);
            } catch (error) {
                console.error("Error fetching the book:", error);
            }
        };

        if (id) fetchBook();
    }, [id]);

    const onSubmit = handleSubmit(async (data) => {

        try {

            const updatedData = { ...data };
            const ed = await editBook(book.id, updatedData);
            if (ed.status === 200) {
                navigate("/books")
            }

        } catch (error) {

            if (error.response) {

                if (error.response.status === 404) {
                    console.error('La ruta no fue encontrada (404).');
                }

            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);

            } else {
                console.error('Error al configurar la solicitud:', error.message);
            }

        }

    });

    return (
        <div id="bookForm">
            <h1>Edit Book</h1>
            {book ? (
                <form onSubmit={onSubmit} book={book}>

                    <div className="div-inputs">
                        <input
                            type="text"
                            id="title"
                            placeholder={book.title}
                            defaultValue={book.title || ""}
                            {...register("title", { required: "El título es obligatorio", maxLength: 200 })}
                            required
                        />
                        {errors.title && <p>{errors.title.message}</p>}
                    </div>

                    <div className="div-inputs">
                        <input
                            type="text"
                            id="author"
                            placeholder="Nombre del autor"
                            defaultValue={book.author || ""}
                            {...register("author", { required: "El autor es obligatorio", maxLength: 100 })}
                            required
                        />
                        {errors.author && <p>{errors.author.message}</p>}
                    </div>

                    <div className="div-inputs-date">
                        <p>Fecha de publicacion: </p>
                        <input
                            type="date"
                            id="date"
                            defaultValue={book.date || ""}
                            {...register("date", { required: "La fecha es obligatoria" })}
                            required
                        />
                        {errors.date && <p>{errors.date.message}</p>}
                    </div>

                    <div className="div-inputs">
                        <input
                            type="text"
                            id="genre"
                            placeholder="Género literario"
                            defaultValue={book.genre || ""}
                            {...register("genre", { required: "El género es obligatorio", maxLength: 50 })}
                            required
                        />
                        {errors.genre && <p>{errors.genre.message}</p>}
                    </div>

                    <div className="div-inputs">
                        <textarea
                            id="description"
                            placeholder="Descripción del libro (máx. 300 caracteres)"
                            defaultValue={book.description || ""}
                            {...register("description", { maxLength: 300 })}
                        ></textarea>
                        {errors.description && <p>{errors.description.message}</p>}
                    </div>



                    <Link to="/books"><button id="btn-back" type="button">Back</button></Link>
                    <button id="btn-create" type="submit">Edit Book</button>

                </form>
            ) : (
                <p>Loading book details...</p>
            )}
        </div>
    )
}
