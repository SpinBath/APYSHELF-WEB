
export function BookCard({ book }) {
    return (
        <div  key={book.id}>
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <hr/>
        </div>
    )
}

