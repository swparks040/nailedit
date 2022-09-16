import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./Employees.css"

export const EmployeeList = () => {
    const [users, setUsers] = useState([])

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

    return <article className="employees">
        {
            users.map(user => <Employee key={`employee--${user.id}`}
                id={user.id} 
                fullName={user.fullName} 
                email={user.email}
                role={user?.employees?.role} 
                /> )
        }
    </article>
}