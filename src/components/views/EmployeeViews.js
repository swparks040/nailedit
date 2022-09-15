import { Outlet, Route, Routes } from "react-router-dom"
import { AppointmentList } from "../appointments/AppointmentList"
import { ClientDetails } from "../clients/ClientDetails"
import { ClientList } from "../clients/ClientList"
import { EmployeeList } from "../employees/EmployeeList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { Profile } from "../profile/Profile"

export const EmployeeViews = () => {
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
                <Route path="clients" element={ <ClientList />} />
                <Route path="clients/:clientId" element={ <ClientDetails /> } />
                <Route path="employees" element={ <EmployeeList />} />
                <Route path="employees/:employeeId" element={ <EmployeeDetails /> } />
                
            </Route>
        </Routes>
    )
}
// <Route path="profile" element={ <Profile /> } /> This route will lead to the Profile.js module. The Profile function will include logic that will route based on "isStaff" or "nailedItUserObject.staff". If staff, route to EmployeeForm. If not staff, route to ClientForm.

// <Route path="employees" element={ <EmployeeList />} /> This route will lead to the EmployeeList.js module. The EmployeeList function will inclide logic that, given access to employees, fetch users URL including ?isStaff=true and then setting an employeeArray. EmployeeList will return an <article> of mapped employees.

// <Route path="clients" element={ <ClientList />} /> This route will lead to the ClientList.js module. The ClientList function will inclide logic that, given access to clients, fetch users URL including ?isStaff=false and then setting a clientArray. ClientList will return an <article> of mapped clients.

// <Route path="employees/:employeeId" element={ <EmployeeDetails /> } />
// <Route path="clients/:clientId" element={ <ClientDetails /> } />