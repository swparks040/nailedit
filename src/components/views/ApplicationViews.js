/* To begin, set application views to a default. Will eventually need ClientViews and EmployeeViews once users are divided between client and employee. */

import { ClientViews } from "./ClientViews"
import { EmployeeViews } from "./EmployeeViews"


export const ApplicationViews = () => {
    
    const localNailedItUser = localStorage.getItem("nailedIt_user")
    const nailedItUserObject = JSON.parse(localNailedItUser)
	
	if(nailedItUserObject.staff) {
        //Return employee views
		return <EmployeeViews />
	}
	else {
        //Return client views
		return <ClientViews />
	}
}
