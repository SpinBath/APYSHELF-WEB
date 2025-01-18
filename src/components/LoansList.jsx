import { useEffect, useState } from "react"
import { infoUser } from "../api/user.api";
import { getAllLoans, getLoans } from "../api/loans.api";
import { LoanCard } from "./LoanCard";
import "./styles/LoanList.css"


export function LoanList() {

    const [loans, setLoans] = useState([]);
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
                setLoans(res.data.results);
            }
            loadLoans();
            console.log(loans.length)
        }
    }, [user]);

    return (
        <div className="loanList">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Loan Dates</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.length === 0 ? (
                        <p>No loans available</p>
                    ) : (
                        loans.map((loan) => (
                            <LoanCard key={loan.id} loan={loan} />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

