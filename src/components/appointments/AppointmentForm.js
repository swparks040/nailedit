import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AppointmentForm = () => {
        
//      Added the default properties to the initial state object.

    const [appointment, update] = useState({
            userId: 0,
            nailColorId: 0,
            nailShapeId: 0,
            nailEffectsId: 0,
            directions: "",
            dateBooked: ""
    })

//      implement "const navigate = useNavigate()"" hook so I can redirect the clients and employees to the appointment list.

const navigate = useNavigate()
const localNailedItUser = localStorage.getItem("nailedIt_user")
const nailedItUserObject = JSON.parse(localNailedItUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        

//      create object to be sent to the API

           const appointmentToSendToAPI = {
               userId: nailedItUserObject.id,
               nailColorId: appointment.nailColorId,
               nailShapeId: appointment.nailShapeId,
               nailEffectsId: appointment.nailEffectsId,
               directions: "",
               dateBooked: ""
           }

//      post to API with fetch POST.
        return fetch(`http://localhost:8088/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(appointmentToSendToAPI)
        })
           .then(response => response.json())
           .then(() => {
                navigate("/appointments")
           })
    }

    return (
        <form className="appointmentForm">
            <h2 className="appointmentForm__title">New Appointment</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Nail Colors</label>
                    <input type="checkbox"
                        value={appointment.nailColorId}
                        onChange={
                            (evt) => {
                                const copy = {...appointment}
                                copy.appointment = evt.target.checked
                                update(copy)
                            }
                            
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Nail Shapes</label>
                    <input type="checkbox"
                        value={appointment.nailShapeId}
                        onChange={
                            (evt) => {
                                const copy = {...appointment}
                                copy.appointment = evt.target.checked
                                update(copy)
                            }
                            
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Nail Effects</label>
                    <input type="checkbox"
                        value={appointment.nailEffectsId}
                        onChange={
                            (evt) => {
                                const copy = {...appointment}
                                copy.appointment = evt.target.checked
                                update(copy)
                            }
                            
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="directions">Directions/Notes</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Directions and notes for your nail technician..."
                        value={appointment.directions}
                        onChange={
                            (evt) => {
                                const copy = {...appointment}
                                copy.directions = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                 <label htmlFor="dates">Date:</label> 
                 <input
                    required autoFocus
                    type="date"
                    className="form-control"
                    value={appointment.dateBooked}
                    min="2020-01-01"
                    max="2030-01-01"
                    />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}    
                className="btn btn-primary">
                    Book Appointment
            </button>
        </form>
    )
}