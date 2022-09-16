import { useEffect, useState } from "react"
import { Client } from "./Client"
import "./Clients.css"

export const ClientList = () => {
    const [clients, setClients] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=false`)
            .then (response => response.json())
            .then ((clientArray) => {
                setClients(clientArray)
            })
        },
        []
    )

    return <article className="clients">
        {
            clients.map(client => <Client key={`client--${client.id}`}
                id={client.id} 
                fullName={client.fullName}
                email={client.email}
                address={client?.clients?.address} 
                phone={client?.clients?.phone} /> )
        }
    </article>
}