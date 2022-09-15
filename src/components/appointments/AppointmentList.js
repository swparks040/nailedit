/* use state for appointments, use effect for appointments

1. Create AppointmentList function to be used/rendered in ApplicationViews.js*/

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AppointmentList = () => {
    const [appointments, setAppointments] = useState([])
    //create another state so I can modify filteredAppointments 
    const [filteredAppointments, setFilteredAppointments] = useState([])
    const localNailedItUser = localStorage.getItem("nailedIt_user")
    const nailedItUserObject = JSON.parse(localNailedItUser)
    const navigate = useNavigate();

    useEffect(
        () => {
            fetch(`http://localhost:8088/appointments`)
            .then(response => response.json())
            .then((appointmentArray) => {
                setAppointments(appointmentArray)
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
                ? <>
                
                </>
                : <button onClick={() => navigate("/appointment/create")}>Make Appointment</button>
        }
    



    
        <h2>List of Appointments</h2>

        <article className="appointments">
            {
                filteredAppointments.map(
                    (appointment) => {
                        return <section className="appointment">
                            <header>{appointment.userId}</header>
                            <div>Colors: {appointment.nailColorId}</div>
                            <div>Shapes: {appointment.nailShapeId}</div>
                            <div>Effects: {appointment.nailEffectId}</div>
                            <div>Directions: {appointment.directions}</div>
                            <div>Date: {appointment.dateCompleted}</div>
                        </section>
                    }
                )
            }
        </article>
</>

}