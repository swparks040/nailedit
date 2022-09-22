import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Employee } from "./Employee"
import "./Employees.css"

export const EmployeeList = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true&_embed=employees`)
            .then (response => response.json())
            .then ((employeeArray) => {
                setUsers(employeeArray)
            })
        },
        []
    )

    return <><article className="employees">
        <span className="employeeList__details">Select hyperlink for details...</span>
        {
            users.map(user => <Employee key={`employee--${user.id}`}
            id={user.id} 
            fullName={user.fullName} 
            email={user.email}
            role={user?.employees?.role} 
            /> )
        }
    </article>
    <button className="back__button"onClick={() => navigate(`/`)}>Back</button>
        </>
    
}