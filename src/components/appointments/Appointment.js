import { useNavigate } from "react-router-dom"

export const Appointment = ({appointmentObject, currentUser, employees, pullAppointments}) => {

    let assignedEmployee = null
    if (appointmentObject.employeeAppointments.length > 0) {
        const appointmentEmployeeRelationship = appointmentObject.employeeAppointments[0]
        assignedEmployee = employees.find(employee => employee.id === appointmentEmployeeRelationship.employeeId)
    }
    



    const navigate = useNavigate();
    
  
        return <section className="appointment" key={`appointment--${appointmentObject.id}`}>
        <header>
            {
                currentUser.staff
                     ? `Appointment ${appointmentObject.id}`
                     : `Appointment ${appointmentObject.id}`
            }
        </header>
        <div>Colors: {appointmentObject.nailColorId}</div>
        <div>Shapes: {appointmentObject.nailShapeId}</div>
        <div>Effects: {appointmentObject.nailEffectId}</div>
        <div>Directions: {appointmentObject.directions}</div>
        <div>Date: {appointmentObject.dateBooked}</div>
        <button onClick={() => navigate(`/appointments/${appointmentObject.id}/edit`)}>Edit Appointment</button>
        <footer>
            {
                appointmentObject.employeeAppointments.length 
                    ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    : <button
                    onClick={() => {
                        fetch(`http://localhost:8088/employeeAppointments`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                employeeId: currentUser.id,
                                appointmentId: appointmentObject.id
                            })
                        })
                        .then (response => response.json())
                        .then (() => {
                          //GET the state from the API again
                          pullAppointments()
                        })
                        }}>Claim</button>
            }
        </footer>
    </section>
}