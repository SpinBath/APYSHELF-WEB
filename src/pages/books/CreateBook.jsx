import React from "react";
import { Navigation } from "../../components/Navigation";
import { AddBookForm } from "../../components/BookCard";

import styles from "./books.module.css";


const CreateBook = () => {
    return (
        <div className={styles.divbooks}>
            <Navigation btmbooks={styles.btmbooks} />
            <AddBookForm />
            <footer></footer>
        </div>

    );
};

export default CreateBook;
