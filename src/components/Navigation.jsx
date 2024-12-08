import { Link } from "react-router-dom"
import "./styles/Navigation-styles.css"

export function Navigation() {
    return (
        <div className="div-navigation">
            <button id="btm-home">
                <Link to="/home">
                    <h2>
                        HOME
                    </h2>
                </Link>
            </button>
            <button id="btm-books">
                <Link to="/books">
                    <h2>
                        BOOKS
                    </h2>
                </Link>
            </button>
            <button id="btm-loans">
                <Link to="/loans">
                    <h2>
                        LOANS
                    </h2>
                </Link>
            </button>
            <button id="btm-account">
                <Link to="/account">
                    <h2>
                        ACCOUNT
                    </h2>
                </Link>
            </button>
        </div>
    )
}