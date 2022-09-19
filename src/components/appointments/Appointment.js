import { useNavigate } from "react-router-dom"

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
            }}className="appointment__delete">Delete</button>
        } 
        else {
            return <button onClick={() => {
                fetch(`http://localhost:8088/appointments/${appointmentObject.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                    pullAppointments()
                })
            }}className="appointment__delete">Delete</button>
        }
    }

    const canClaim = () => {
        if (nailedItUserObject.staff) {
            return appointmentObject.employeeAppointments.length 
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
        } else {
            return ""
        }

    }

    const canClose = () => {
        if (nailedItUserObject.staff) {
            if (appointmentObject.dateCompleted === "") {
                return <button onClick={closeAppointment}className="appointment__finish">Complete</button>
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
    
  
        return <section className="appointment" key={`appointment--${appointmentObject.id}`}>
        <header>
            {
                currentUser.staff
                     ? `${appointmentObject.user.fullName}'s Appointment`
                     : `${appointmentObject.user.fullName}'s Appointment`
            }
        </header>
        <div>Color: {appointmentObject.nailColor.color}</div>
        <div>Shape: {appointmentObject.nailShape.shape}</div>
        <div>Effect: {appointmentObject.nailEffect.effect}</div>
        <div>Directions: {appointmentObject.directions}</div>
        <div>Date Booked: {appointmentObject.dateBooked}</div>
        <div>Date Completed: {dateCompleted()}</div>
        <footer>
        </footer>
        <button onClick={() => navigate(`/appointments/${appointmentObject.id}/edit`)}>Edit</button>
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
}