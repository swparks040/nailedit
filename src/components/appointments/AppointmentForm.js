import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AppointmentForm = () => {
        
//      Added the default properties to the initial state object.

    const [appointment, update] = useState({
            userId: 0,
            nailColorId: 0,
            nailShapeId: 0,
            nailEffectId: 0,
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
               nailEffectId: appointment.nailEffectId,
               directions: appointment.directions,
               dateBooked: appointment.dateBooked
           }

//      post to API with fetch POST, stringify with .stringify(appointmentObject) in the body, then navigate to appointments.
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
                        value={appointment.nailEffectId}
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
                    <label htmlFor="directions">Directions</label>
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
                    type="date"
                    className="form-control"
                    required pattern="\d{4}-\d{2}-\d{2}"
                    value={appointment.dateBooked}
                    min="2022-01-21"
                    max="2030-01-01"
                    onChange={
                        (evt) => {
                            const copy = {...appointment}
                            copy.dateBooked = evt.target.value
                            update(copy)
                        }}
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