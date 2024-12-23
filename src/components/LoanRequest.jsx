import { useEffect, useState } from "react"
import { getAllBooks } from "../api/books.api"
import { BookCardRequest } from "./BookCard";
import "./styles/LoanRequest.css"


export function LoanRequest() {

    return (
        <div className="bookList">
            <h1 id="titleBookList">DO YOU WANT REQUEST THIS BOOK ?</h1>
            <BookCardRequest />
        </div>
    )
}