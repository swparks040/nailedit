import { useEffect, useState } from "react";


export const ClientForm = () => {
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: 0,
      });
    
      const localNailedItUser = localStorage.getItem("nailedIt_user");
      const nailedItUserObject = JSON.parse(localNailedItUser);
      const [feedback, setFeedback] = useState("")

      useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    useEffect(() => {
        fetch(`http://localhost:8088/clients?userId=${nailedItUserObject.id}`)
          .then((response) => response.json())
          .then((data) => {
            const clientObject = data[0];
            updateProfile(clientObject);
            
          });
      }, []);

      const handleSaveButtonClick = (event) => {
        event.preventDefault();

        return fetch(`http://localhost:8088/clients/${profile.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
          })
            .then((response) => response.json())
            .then(() => {
              setFeedback("Client profile successfully saved")
          })
        };

        return <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
        </div>
        <form className="profile">
          <h2 className="profile__title">Update Client Profile</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                required
                autoFocus
                type="text"
                placeholder="123 Happy Street, Happyville, HA #####"
                className="form-control"
                value={profile.address}
                onChange={(evt) => {
                  const copy = { ...profile };
                  copy.address = evt.target.value;
                  updateProfile(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                required
                autoFocus
                type="text"
                placeholder="###-###-####"
                className="form-control"
                value={profile.phoneNumber}
                onChange={(evt) => {
                  const copy = { ...profile };
                  copy.phoneNumber = evt.target.value;
                  updateProfile(copy);
                }}
              />
            </div>
          </fieldset>
          <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary"
          >
            Save Profile
          </button>
        </form>
        </>

}