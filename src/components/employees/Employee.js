import { Link } from "react-router-dom"

export const Employee = ({id, fullName, email}) => {
    
    return<>
        <section className="employee">
            <p>
            Name: <Link to={`/employees/${id}`}> {fullName}</Link>
            </p>
            <p>Email: {email}</p>
        </section>
        <div></div>
          </>
}