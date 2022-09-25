import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Profile.css"

export const EmployeeForm = () => {
  const navigate = useNavigate()
  const {employeeId} = useParams()
// Create initial state for profile
  const [profile, updateProfile] = useState({
    userId: 0,
    payRate: 0,
    role: "",
    startDate: "",
  });

  // const localNailedItUser = localStorage.getItem("nailedIt_user");
  // const nailedItUserObject = JSON.parse(localNailedItUser);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (feedback !== "") {
      setTimeout(() => setFeedback(""), 3000);
    }
  }, [feedback]);

//   This fetch pulls employee profile information from the API for the most up to date information for employees and updates the state
  useEffect(() => {
    fetch(`http://localhost:8088/employees?userId=${employeeId}`)
      .then((response) => response.json())
      .then((data) => {
        const employeeObject = data[0];
        updateProfile(employeeObject);
      });
  }, []);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

//   use a PUT fetch call to update the profile for the employee.

    return fetch(`http://localhost:8088/employees/${profile.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((response) => response.json())
      .then(() => {
        setFeedback("Employee profile successfully saved");
      });
  };

  return (
    <>
      <div
        className={`${feedback.includes("Error") ? "error" : "feedback"} ${
          feedback === "" ? "invisible" : "visible"
        }`}
      >
        {feedback}
      </div>
      <form className="profile">
        <h2 className="profile__title">Update Employee Profile</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Hourly Rate:</label>
            <input
              type="number"
              className="form-control"
              value={profile.payRate}
              onChange={(evt) => {
                const copy = { ...profile };
                copy.payRate = parseFloat(evt.target.value, 2);
                updateProfile(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="specialty">Job Description:</label>
            <input
              required
              autoFocus
              type="text"
              className="form-control"
              value={profile.role}
              onChange={(evt) => {
                const copy = { ...profile };
                copy.role = evt.target.value;
                updateProfile(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="dates">Employment Start Date:</label>
            <input
              required
              autoFocus
              type="date"
              className="form-control"
              value={profile.startDate}
              min="2000-01-01"
              max="2030-01-01"
              onChange={(evt) => {
                const copy = { ...profile };
                copy.startDate = evt.target.value;
                updateProfile(copy);
              }}
            />
          </div>
        </fieldset>
        <button
          onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
          className="saveProfile__button"
        >
          Save Employee Information
        </button>
        <button className="back__button"onClick={() => navigate(`/employees`)}>Back</button>
      </form>
    </>
  );
};
