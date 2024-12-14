import { Link } from "react-router-dom"

import styles from "./styles/Navigation.module.css"

export function Navigation({ btmHome, btmbooks, btmLoans, btmAccount }) {
    return (
        <div className={styles.divnavigation}>
            <button className={btmHome}>
                <Link to="/home">
                    <h2>
                        HOME
                    </h2>
                </Link>
            </button>
            <button className={btmbooks}>
                <Link to="/books">
                    <h2>
                        BOOKS
                    </h2>
                </Link>
            </button>
            <button className={btmLoans}>
                <Link to="/loans">
                    <h2>
                        LOANS
                    </h2>
                </Link>
            </button>
            <button className={btmAccount}>
                <Link to="/account">
                    <h2>
                        ACCOUNT
                    </h2>
                </Link>
            </button>
        </div>
    )
}