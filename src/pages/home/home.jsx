import React from "react";
import { Navigation } from "../../components/Navigation";
import styles from "./home.module.css";

const HomePage = () => {
    return (
        <div className={styles.divhome}>
            <Navigation btmhome={styles.btmhome} />
        </div>

    );
};

export default HomePage;
