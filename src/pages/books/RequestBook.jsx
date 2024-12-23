import React from "react";
import { Navigation } from "../../components/Navigation";
import { LoanRequest } from "../../components/LoanRequest";
import styles from "./books.module.css";


const RequestBook = () => {
    return (
        <div className={styles.divbooks}>
            <Navigation btmbooks={styles.btmbooks} />
            <LoanRequest />
            <footer></footer>

        </div>

    );
};

export default RequestBook;
