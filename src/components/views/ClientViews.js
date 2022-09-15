import { Outlet, Route, Routes } from "react-router-dom"
import { AppointmentEdit } from "../appointments/AppointmentEdit"
import { AppointmentForm } from "../appointments/AppointmentForm"
import { AppointmentList } from "../appointments/AppointmentList"
import { Profile } from "../profile/Profile"

export const ClientViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Nailed It! by Olivia</h1>
                    <div>Yo, get ya nails right...</div>

                    <Outlet />
                </>
            }>

                <Route path="appointments" element={ <AppointmentList /> } />
                <Route path="profile" element={ <Profile /> } />
                <Route path="appointment/create" element={ <AppointmentForm /> } />
                <Route path="appointment/:appointmentId/edit" element={ <AppointmentEdit />} />
            </Route>
        </Routes>
    )
}