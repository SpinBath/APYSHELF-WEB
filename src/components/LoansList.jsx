import { useEffect, useState } from "react"
import { getAllLoans } from "../api/loans.api";
import { LoanCard } from "./LoanCard";
import "./styles/LoanList.css"


export function LoanList() {

    const [loans, setLoan] = useState([]);

    useEffect(() => {
        async function loadLoans() {
            const res = await getAllLoans();
            setLoan(res.data.results);
        }
        loadLoans();

    }, []);

    return (
        <div className="loanList">

            {loans.map((loan) => (
                <LoanCard key={loan.id} loan={loan} />
            ))}

        </div>
    )
}

