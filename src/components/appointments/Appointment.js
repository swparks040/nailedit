import { useNavigate } from "react-router-dom"
import "./Appointments.css"


export const Appointment = ({appointmentObject, currentUser, employees, pullAppointments}) => {

    let assignedEmployee = null
    if (appointmentObject.employeeAppointments.length > 0) {
        const appointmentEmployeeRelationship = appointmentObject.employeeAppointments[0]
        assignedEmployee = employees.find(employee => employee.id === appointmentEmployeeRelationship.employeeId)
    }

    const localNailedItUser = localStorage.getItem("nailedIt_user")
    const nailedItUserObject = JSON.parse(localNailedItUser)

    const dateCompleted = () => {
      if (appointmentObject.dateCompleted === "") {
          return "Pending"
      }
      else {
          return appointmentObject.dateCompleted
      }
    }

    const canDelete = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/appointments/${appointmentObject.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                    pullAppointments()
                })
            }}className="appointmentDelete__button">Delete</button>
        } 
        else {
            return <button onClick={() => {
                fetch(`http://localhost:8088/appointments/${appointmentObject.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                    pullAppointments()
                })
            }}className="appointmentDelete__button">Delete</button>
        }
    }

    const canClaim = () => {
        if (nailedItUserObject.staff) {
            return appointmentObject.employeeAppointments.length 
            ? <span className="appointmentClaim__tag">Currently with {assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}</span>
            : <button className="appointmentClaim__button"
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
        } else {
            return ""
        }

    }

    const canClose = () => {
        if (nailedItUserObject.staff) {
            if (appointmentObject.dateCompleted === "") {
                return <button onClick={closeAppointment}className="appointmentComplete__button">Complete</button>
            }
            else if (appointmentObject.dateBooked === "") {
                return ""
            }
            else{
                return ""
            }
    } else {
        return ""
    }
    }

    const canEdit = () => {
        if (appointmentObject.dateCompleted === dateCompleted()) {
            return ""
        }
        else {
            return <button className="appointmentEdit__button"onClick={() => navigate(`/appointments/${appointmentObject.id}/edit`)}>Edit</button>
        }
    }
    
    const closeAppointment = () => {
      const copy = {
            userId: appointmentObject.userId,
            nailColorId: appointmentObject.nailColorId,
            nailShapeId: appointmentObject.nailShapeId,
            nailEffectId: appointmentObject.nailEffectId,
            directions: appointmentObject.directions,
            dateBooked: appointmentObject.dateBooked,
            dateCompleted: new Date()
      }
      return fetch(`http://localhost:8088/appointments/${appointmentObject.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(copy)
      })
        .then(response => response.json())
        .then(pullAppointments)
    }


    const navigate = useNavigate();
    
  
        return <><section className="appointment" key={`appointment--${appointmentObject.id}`}>
        <header className="appointment__header">
            {
                currentUser.staff
                     ? `${appointmentObject.user.fullName}'s Appointment`
                     : `${appointmentObject.user.fullName}'s Appointment`
            }
        </header>
        <div className="appointment__details">
            <p>Color: {appointmentObject.nailColor.color}</p>
            <p>Shape: {appointmentObject.nailShape.shape}</p>
            <p>Effect: {appointmentObject.nailEffect.effect}</p>
            <p>Directions: {appointmentObject.directions}</p>
            <p>Date Booked: {appointmentObject.dateBooked}</p>
            <p>Date Completed: {dateCompleted()}</p>
        </div>
        <footer>
        </footer>
            {
                canEdit()
            }
            {
                canClose()
            }
            {
                canDelete()
            }
            {
                canClaim() 
            }
    </section>
    </>
}