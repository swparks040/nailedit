/* use state for appointments, use effect for appointments

1. Create AppointmentList function to be used/rendered in ApplicationViews.js*/

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Appointment } from "./Appointment"
import "./Appointments.css"
export const AppointmentList = () => {
    const [appointments, setAppointments] = useState([])
    const [employees, setEmployees] = useState([])
    //create another state so I can modify filteredAppointments 
    const [filteredAppointments, setFilteredAppointments] = useState([])
    const localNailedItUser = localStorage.getItem("nailedIt_user")
    const nailedItUserObject = JSON.parse(localNailedItUser)
    const navigate = useNavigate();

    const pullAppointments = () => {
        fetch(`http://localhost:8088/appointments?_embed=employeeAppointments&_expand=user&_expand=nailColor&_expand=nailShape&_expand=nailEffect`)
        .then(response => response.json())
        .then((appointmentArray) => {
            setAppointments(appointmentArray)
        })
    }

    useEffect(
        () => {
            
            pullAppointments()

            fetch(`http://localhost:8088/employees?_expand=user`)
            .then(response => response.json())
            .then((employeeArray) => {
                setEmployees(employeeArray)
            })

        },
        []
    )

    useEffect(
        () => {
            if (nailedItUserObject.staff) {
                // for employees
                setFilteredAppointments(appointments)
            }
            else {
                // for clients
                const myAppointments = appointments.filter(appointment => appointment.userId === nailedItUserObject.id)
                setFilteredAppointments(myAppointments)
            }
        },
        [appointments]
    )

    return <>
        {
            nailedItUserObject.staff
                ? <></>
                : <><button onClick={() => navigate("/appointment/create")}>Make Appointment</button></>
                
        }
    



    
        <h2>List of Appointments</h2>

        <article className="appointments">
            {
                filteredAppointments.map(
                    (appointment) => <Appointment 
                    pullAppointments={pullAppointments}
                    employees={employees}
                    currentUser={nailedItUserObject} 
                    appointmentObject={appointment} />
                )
            }
        </article>
</>

}