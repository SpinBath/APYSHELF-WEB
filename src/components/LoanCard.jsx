import "./styles/LoanCards.css"

export function LoanCard({ loan }) {

    const borrow_date_date = new Date(loan.borrow_date)
    const borrow_date = borrow_date_date.toISOString().split('T')[0];
    const return_date_date = new Date(loan.borrow_date)
    const return_date = return_date_date.toISOString().split('T')[0];

    return (

        <div className="BookCard">
            <div id="loan-info">
                <p id="p-loan">{loan.book}</p>
                <p id="p-loan-dates">{borrow_date}, {return_date}</p>
            </div>
        </div >
    );
}