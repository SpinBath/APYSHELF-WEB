import React from "react";
import { Navigation } from "../../components/Navigation";
import { AccoutInfo } from "../../components/UserPanel";
import styles from "./account.module.css";

const AccountPage = () => {
    return (
        <div className={styles.divaccount}>
            <Navigation btmaccount={styles.btmaccount} />
            <AccoutInfo />
            <footer></footer>
        </div>
        

    );
};

export default AccountPage;
