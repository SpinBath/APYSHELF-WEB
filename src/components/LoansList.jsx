import { useEffect, useState } from "react"
import { infoUser } from "../api/user.api";
import { getAllLoans, getLoans } from "../api/loans.api";
import { LoanCard } from "./LoanCard";
import "./styles/LoanList.css"


export function LoanList() {

    const [loans, setLoan] = useState([]);
    const [user, setUsers] = useState(null);

    useEffect(() => {
        async function loadUser() {
            const userData = await infoUser(localStorage.getItem("token"));
            setUsers(userData.data);
        }
        loadUser();

    }, []);


    useEffect(() => {
        if (user) {

            async function loadLoans() {
                const res = await getLoans(user.id);
                setLoan(res.data.results);
            }
            loadLoans();
        }
    }, [user]);

    return (
        <div className="loanList">

            {loans.map((loan) => (
                <LoanCard key={loan.id} loan={loan} />
            ))}

        </div>
    )
}

