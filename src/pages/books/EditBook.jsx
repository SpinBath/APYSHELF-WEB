import React from "react";
import { Navigation } from "../../components/Navigation";
import { EditBookForm } from "../../components/BookCard";

import styles from "./books.module.css";


const EditBook = () => {
    return (
        <div className={styles.divbooks}>
            <Navigation btmbooks={styles.btmbooks} />
            <EditBookForm />
            <footer/>
        </div>

    );
};

export default EditBook;