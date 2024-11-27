import { Link } from "react-router-dom"

export function Navigation() {
    return (
        <div>
            <Link to="/books">
                <h2>
                    Library App
                </h2>
            </Link>

            <Link to="/books-create">create book</Link>

        </div>
    )
}