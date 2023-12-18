import React, { useState } from "react";
import emailImg from "../../assets/images/email.png";
import userImg from "../../assets/images/person.png";

import "./SignUp.css";

function SignUp() {
  // to capture the value of what a user inputs with usestate.
  const [emailAddress, setEmailAddress] = useState(""); // State for email address
  const [user, setUser] = useState(""); // State for the user's name
  const [responseMessage, setResponseMessage] = useState(""); // State for response message

  // to capture the info when the user submits form
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user + emailAddress);

    const userData = {
      FullName: user,
      Email: emailAddress,
    };

    // Send data to the server
    fetch("http://localhost:8080/addtowaitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server response:", data);
        setResponseMessage(data);
      })
      .catch((err) => {
        console.error("Error:", err);
        setResponseMessage("Error submitting form");
      });
  };

  return (
    <div className="fullpage">
      <form className="signup-container" onSubmit={handleSubmit}>
        <div className="header">
          <div className="text">
            <h1>Sorry spaces are full. </h1>
            <p>
              Please sign up for our waiting list.
              <br />
              We'll get in touch when spaces are available.
            </p>
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={userImg} alt="user icon" />
            <input
              value={user}
              onChange={(event) => setUser(event.target.value)}
              type="text"
              placeholder="enter full name"
              aria-label="waitlisted-name"
            />
          </div>
          <div className="input">
            <img src={emailImg} alt="email icon" />
            <input
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
              type="email"
              placeholder="enter email"
              aria-label="waitlisted-email"
            />
          </div>
          <div className="waitlist-container">
            <button className="waitlist" type="submit">
              Join waitlist
            </button>
          </div>
        </div>
        <div className="success">
          {responseMessage && <p>{responseMessage}</p>}{" "}
          {/* Display response message */}
        </div>
      </form>
    </div>
  );
}

export default SignUp;
