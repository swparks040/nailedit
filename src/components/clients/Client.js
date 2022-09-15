import { Link } from "react-router-dom"

export const Client = ({id, fullName, address, phone}) => {
    
    return <section className="client">
        <div>
            <Link to={`/clients/${id}`}>Name: {fullName}</Link>
        </div>
        <div>Address: {address}</div>
        <div>Phone Number: {phone}</div>
    </section>
}