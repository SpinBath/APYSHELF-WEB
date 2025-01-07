import { useNavigate, Link, useParams } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react';

import { getBook, editBook, deleteBook } from '../api/books.api'
import { createLoan } from "../api/loans.api"


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
                    <Link to={`/books-request/${book.id}`}><button>Request loan</button></Link>{book.status} <div id="icon"
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

    const { register, handleSubmit, setValue, setError, watch, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setData] = useState(null);

    const borrowDate = watch("borrow_date");
    const today = new Date().toISOString().split('T')[0];
    const minDate = new Date();



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
            // Crear préstamo
            const res = await createLoan(data);

            // Validar el estado de la respuesta
            if (res.status === 201) {
                const updatedData = {
                    status: "On hold"
                };

                // Editar el libro
                const ed = await editBook(book.id, updatedData);
                console.log('Libro actualizado:', ed.data);

                // Navegar después del éxito
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