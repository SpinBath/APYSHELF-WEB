import React from "react";
import { Navigation } from "../../components/Navigation";
import { EditAccoutInfo } from "../../components/UserPanel";
import styles from "./account.module.css";

const EditAccountPage = () => {
    return (
        <div className={styles.divaccount}>
            <Navigation btmaccount={styles.btmaccount} />
            <EditAccoutInfo />
            <footer></footer>
        </div>


    );
};

export default EditAccountPage;
