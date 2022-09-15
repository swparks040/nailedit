import { useEffect, useState } from "react"
import { Client } from "./Client"
import "./Clients.css"

export const ClientList = () => {
    const [users, setUsers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=false`)
            .then (response => response.json())
            .then ((userArray) => {
                setUsers(userArray)
            })
        },
        []
    )

    return <article className="clients">
        {
            users.map(user => <Client key={`client--${user.id}`}
                id={user.id} 
                fullName={user.fullName}
                email={user.email}
                address={user?.clients?.address} 
                phone={user?.clients?.phone} /> )
        }
    </article>
}