import React from "react";
import { Navigation } from "../../components/Navigation";
import { BookList } from "../../components/BooksList";
import styles from "./books.module.css";


const BooksPage = () => {
    return (
        <div className={styles.divbooks}>
            <Navigation btmbooks={styles.btmbooks} />
            <BookList />
        </div>

    );
};

export default BooksPage;
