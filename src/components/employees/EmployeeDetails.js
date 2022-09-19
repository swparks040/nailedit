import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const EmployeeDetails = () => {
    const {employeeId} = useParams()
    const [employee, updateEmployee] = useState([])
    const navigate = useNavigate();

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeAppointments&userId=${employeeId}`)
            .then(response => response.json())
            .then((data) => {
                const singleEmployee = data[0]
                updateEmployee(singleEmployee)
            })
        },
        [employeeId]
    )

    return <section className="employee">
    <header className="employee__header">{employee?.user?.fullName}</header> 
    <div>Email: {employee?.user?.email}</div>
    <div>Role: {employee.role}</div>
    <div>Pay: {employee.payRate}</div>
    <div>Start Date: {employee.startDate}</div>
    <footer className="employee__footer">Has claimed {employee?.employeeAppointments?.length} appointments.</footer>
    <button onClick={() => navigate(`/profile/${employeeId}`)}>Update Employee Details
            </button>
</section>
}