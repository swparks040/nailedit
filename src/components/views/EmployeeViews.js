// <Route path="profile" element={ <Profile /> } /> This route will lead to the Profile.js module. The Profile function will include logic that will route based on "isStaff" or "nailedItUserObject.staff". If staff, route to EmployeeForm. If not staff, route to ClientForm.

// <Route path="employees" element={ <EmployeeList />} /> This route will lead to the EmployeeList.js module. The EmployeeList function will inclide logic that, given access to employees, fetch users URL including ?isStaff=true and then setting an employeeArray. EmployeeList will return an <article> of mapped employees.

// <Route path="clients" element={ <ClientList />} /> This route will lead to the ClientList.js module. The ClientList function will inclide logic that, given access to clients, fetch users URL including ?isStaff=false and then setting a clientArray. ClientList will return an <article> of mapped clients.

// <Route path="employees/:employeeId" element={ <EmployeeDetails /> } />
// <Route path="clients/:clientId" element={ <ClientDetails /> } />

import { Outlet, Route, Routes } from "react-router-dom"
import { AppointmentList } from "../appointments/AppointmentList"
import { ClientDetails } from "../clients/ClientDetails"
import { ClientList } from "../clients/ClientList"
import { EmployeeList } from "../employees/EmployeeList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { Profile } from "../profile/Profile"
import { AppointmentEdit } from "../appointments/AppointmentEdit"
import { AppointmentForm } from "../appointments/AppointmentForm"
import oliviaBanner from "../images/oliviaBanner.jpg"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    
                    <div>
                        <img src={oliviaBanner} alt="banner_image" className="banner_img" style={{width: '100rem', height: '40rem'}}/>
                        
                    </div>
                    

                    <Outlet />
                </>
            }>

                <Route path="appointments" element={ <AppointmentList /> } />
                <Route path="profile/:employeeId" element={ <Profile /> } />
                <Route path="clients" element={ <ClientList />} />
                <Route path="clients/:clientId" element={ <ClientDetails /> } />
                <Route path="employees" element={ <EmployeeList />} />
                <Route path="employees/:employeeId" element={ <EmployeeDetails /> } />
                <Route path="appointments/:appointmentId/edit" element={ <AppointmentEdit />} />
                <Route path="appointment/create" element={ <AppointmentForm /> } />
                
            </Route>
        </Routes>
    )
}
