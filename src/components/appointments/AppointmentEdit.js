import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const AppointmentEdit = () => {
    const { appointmentId } = useParams()
    const [appointment, updateAppointment] = useState({
            userId: 0,
            nailColorId: 0,
            nailShapeId: 0,
            nailEffectId: 0,
            directions: "",
            dateBooked: ""
    })
    
    useEffect(() => {
        fetch(`http://localhost:8088/appointments/${appointmentId}`)
        .then ((response) => response.json())
        .then ((data) => {
            updateAppointment(data);
        })
    }, [appointmentId]
    )

    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/appointments/${appointment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(appointment)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/appointments")
            })
    }
    
    return (
        <form className="appointmentForm">
            <h2 className="appointmentForm__title">Edit Appointment Details</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Nail Colors</label>
                    <input type="checkbox"
                        value={appointment.nailColorId}
                        onChange={
                            (evt) => {
                                const copy = {...appointment}
                                copy.appointment = evt.target.checked
                                updateAppointment(copy)
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
                                updateAppointment(copy)
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
                                updateAppointment(copy)
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
                                updateAppointment(copy)
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
                            updateAppointment(copy)
                        }}
                    />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}    
                className="btn btn-primary">
                    Update Appointment
            </button>
        </form>
    )
    
    
    
   
}