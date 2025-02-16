import { useEffect, useState } from "react"
import { infoUser } from "../api/user.api";
import { isStaff } from "./ProtectedRoute";
import { getAllLoans, getLoans } from "../api/loans.api";
import { LoanCard, LoanCardAdmin } from "./LoanCard";
import "./styles/LoanList.css"


export function LoanList() {

    const [isUserStaff, setIsUserStaff] = useState(false);
    const [loans, setLoans] = useState([]);
    const [user, setUsers] = useState(null);

    useEffect(() => {
        async function fetchStaffStatus() {
            const staffStatus = await isStaff();
            setIsUserStaff(staffStatus);
        }

        fetchStaffStatus();
    }, []);

    useEffect(() => {
        async function loadUser() {
            const userData = await infoUser(localStorage.getItem("token"));
            setUsers(userData.data);
        }
        loadUser();

    }, []);


    useEffect(() => {

        if (isUserStaff) {
            async function loadLoans() {
                const res = await getAllLoans();
                setLoans(res.data.results);
            }
            loadLoans();
            console.log(loans.length)

        } else if (user) {
            async function loadLoans() {
                const res = await getLoans(user.id);
                setLoans(res.data.results);
            }
            loadLoans();
            console.log(loans.length)
        }

    }, [user]);


    if (isUserStaff) {
        return (
            <div className="loanList">
                <table>
                    <thead>
                        <tr>
                            <th id="th-user">Gmail</th>
                            <th id="th-title">Title</th>
                            <th id="th-author">Loan Dates</th>
                            <th id="th-date">Status</th>
                            <th id="th-options">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.length === 0 ? (
                            <tr>
                                <td>No loans available</td>
                            </tr>
                        ) : (
                            loans.map((loan) => (
                                <LoanCardAdmin key={loan.id} loan={loan} />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        )
    }



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
                        <tr>
                            <td>No loans available</td>
                        </tr>
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

