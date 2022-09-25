import { Outlet, Route, Routes } from "react-router-dom"
import { AppointmentEdit } from "../appointments/AppointmentEdit"
import { AppointmentForm } from "../appointments/AppointmentForm"
import { AppointmentList } from "../appointments/AppointmentList"
import { RegisterClient } from "../auth/RegisterClient"
import { Profile } from "../profile/Profile"

export const ClientViews = () => {
    
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Nailed It! by Olivia</h1>
                    <div>Create an appointment, edit a current appointment, or delete your appointment!</div>

                    <Outlet />
                </>
            }>

                <Route path="appointments" element={ <AppointmentList /> } />
                <Route path="auth" element={ <RegisterClient /> } />
                <Route path="profile" element={ <Profile /> } />
                <Route path="appointment/create" element={ <AppointmentForm /> } />
                <Route path="appointments/:appointmentId/edit" element={ <AppointmentEdit />} />
            </Route>
        </Routes>
    )
}