import React from "react";
import { Navigation } from "../../components/Navigation";
import { LoanList } from "../../components/LoansList";
import styles from "./loans.module.css";

const LoansPage = () => {
    return (
        <div className={styles.divloans}>
            <Navigation btmloans={styles.btmloans} />
            <LoanList/>
        </div>

    );
};

export default LoansPage;
