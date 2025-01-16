import { useState, useEffect } from "react";
import { getBook, editBook } from "../api/books.api";
import { deleteLoan } from "../api/loans.api";
import "./styles/LoanCards.css"

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

            const counts = book.orders_count - 1

            const updatedData = {
                orders_count: counts,
                status: "On hold"
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