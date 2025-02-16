import { useState, useEffect } from "react";
import { getBook, editBook } from "../api/books.api";
import { editLoan } from "../api/loans.api";
import { deleteLoan } from "../api/loans.api";
import { getUser } from "../api/user.api";
import "./styles/LoanCards.css"

export function LoanCardAdmin({ loan }) {

    const [book, setBook] = useState('');
    const [owner, setOwner] = useState('')
    const [title, setTitle] = useState('');

    useEffect(() => {
        const loadTitleBook = async () => {
            try {
                const res = await getBook(loan.book);
                setTitle(res.data.title);
                setBook(res.data)

            } catch (error) {
                console.error('Error loading book title:', error);
            }
        };

        if (loan.book) {
            loadTitleBook();
        }

    }, [loan.book]);

    useEffect(() => {
        const loadOwnerLoan = async () => {
            try {
                const res = await getUser(loan.owner);
                setOwner(res.data.email)

            } catch (error) {
                console.error('Error loading book title:', error);
            }
        };

        if (loan.owner) {
            loadOwnerLoan();
        }

    }, [loan.owner]);


    const borrow_date = new Date(loan.borrow_date).toISOString().split('T')[0]
    const return_date = new Date(loan.return_date).toISOString().split('T')[0]

    const onReject = async () => {
        const accepted = window.confirm('are you sure?')

        if (accepted) {

            const updatedData = {
                status: "Rejected"
            }
            await editLoan(loan.id, updatedData);

            window.location.reload();
        }
    }

    const onAccept = async () => {
        const accepted = window.confirm('are you sure?')

        if (accepted) {

            const updatedData = {
                status: "Accepted"
            }
            await editLoan(loan.id, updatedData);

            window.location.reload();
        }
    }

    const onPicked = async () => {
        const accepted = window.confirm('are you sure?')

        if (accepted) {

            const updatedData = {
                status: "Picked up"
            }
            await editLoan(loan.id, updatedData);

            window.location.reload();
        }
    }

    const onReturned = async () => {
        const accepted = window.confirm('are you sure?')

        if (accepted) {

            const updatedData = {
                status: "Returned"
            }
            await editLoan(loan.id, updatedData);

            window.location.reload();
        }
    }

    const onDelete = async () => {

        const accepted = window.confirm('are you sure?')
        if (accepted) {

            await deleteLoan(loan.id);
            const updatedData = {
                status: "Available"
            }
            await editBook(book.id, updatedData);

            window.location.reload();
        }

    }

    return (

        <tr className="LoanCardAdmin">
            <td id="td-user">{owner}</td>
            <td id="td-title">{title}</td>
            <td id="td-date">{borrow_date} - {return_date}</td>
            <td id="td-status">{loan.status}</td>
            <td id="td-options">
                {loan.status === "Returned" ? (
                    <button onClick={onDelete}>🗑️</button>
                )
                    : loan.status === "Picked up" ? (
                        <button onClick={onReturned}>📥</button>
                    )
                        : loan.status === "Accepted" ? (
                            <button onClick={onPicked}>📤</button>
                        )
                            : loan.status === "Rejected" ? (
                                <button onClick={onDelete}>🗑️</button>
                            )
                                : loan.status === "On Hold" ? (
                                    <>
                                        <button onClick={onAccept}>✔️</button>
                                        <button onClick={onReject}>❌</button>
                                    </>
                                ) : null}

            </td>
        </tr>

    );
}


export function LoanCard({ loan }) {

    const [book, setBook] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        const loadTitleBook = async () => {
            try {
                const res = await getBook(loan.book);
                setTitle(res.data.title);
                setBook(res.data)
            } catch (error) {
                console.error('Error loading book title:', error);
            }
        };

        if (loan.book) {
            loadTitleBook();
        }
    }, [loan.book]);

    const borrow_date = new Date(loan.borrow_date).toISOString().split('T')[0]
    const return_date = new Date(loan.return_date).toISOString().split('T')[0]

    const onDelete = async () => {

        const accepted = window.confirm('are you sure?')
        if (accepted) {

            await deleteLoan(loan.id);
            const updatedData = {
                status: "Available"
            }
            await editBook(book.id, updatedData);

            window.location.reload();
        }

    }

    return (

        <div className="LoanCard">
            <div id="loan-info">
                <p id="p-loan">{title}</p>
                <p id="p-loan-dates">{borrow_date} - {return_date}</p>
                <p id="p-loan-status">{loan.status}</p>
                <button onClick={onDelete}>🗑️</button>
            </div>
        </div >
    );
}