import { Link } from "react-router-dom"
import "./Clients.css"

export const Client = ({id, fullName, email }) => {
    
    return <section className="client">
        <p>
        Name: <Link to={`/clients/${id}`}> {fullName}</Link>
        </p>
        <p>Email: {email}</p>
        
    </section>
}