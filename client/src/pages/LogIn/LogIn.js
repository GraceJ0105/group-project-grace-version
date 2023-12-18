import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import "./LogIn.css";
import email_icon from "../../assets/images/email.png";
import password_icon from "../../assets/images/password.png";
import axios from "axios";

function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  // Updating Redux store using useDispatch
  const dispatch = useDispatch();
  //empty object of team details, to be updated with fetchTeamInfo API call
  const [teams, setTeams] = useState({});

  // API call to the DB to fetch all team details (team name, ID, email and password)
  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const teamInfo = await axios.get("http://localhost:8080/teams");
        // console.log(teamInfo.data);
        setTeams(teamInfo.data);
      } catch (err) {
        console.error("Axios Error:", err);
        if (err.response) {
          console.error("Response Data:", err.response.data);
          console.error("Response Status:", err.response.status);
          console.error("Response Headers:", err.response.headers);
        } else if (err.request) {
          console.error("Request made but no response received");
          console.error("Request:", err.request);
        } else {
          console.error("Error setting up the request");
          console.error("Error:", err.message);
        }
      }
    };
    fetchTeamInfo();
  }, []);

  // User enters the team credentials, function to check if those details exist within the object returned by fetchTeamInfo 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(teams);
    const teamsArray = Object.values(teams);
    const selectedTeam = teamsArray.find(
      (team) => team.Email === email && team.Password === password
    );
    // Conditional rendering if team credentials are correct, navigated to dashboard
    // Team Name, Team ID & loginStatus are dispatched to store
    if (selectedTeam) {
      console.log("Authentication successful!");
      setLoginStatus(true);
      // Dispatching an action to update the team info in Redux store
      dispatch({
        type: "SET_TEAM_INFO",
        payload: {
          name: selectedTeam.TeamName,
          id: selectedTeam.TeamID,
          loginStatus: loginStatus,
        },
      });
      navigate("/dashboard");
    } else {
      alert("Incorrect username or password");
      console.log("Authentication unsuccessful!");
      return;
    }
  };
  const reportProblem = () => {
    alert("Please contact our team to report a problem");
  };

  // form to collect user input and handle login
  return (
    <div className="login-page">
      <form className="login-container" onSubmit={handleSubmit}>
        <div className="header">
          <div className="text">Log in</div>
          <div className="text-underline"></div>
        </div>
        <div className="form-inputs">
          <div className="form-input">
            <img src={email_icon} alt="emailicon" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              id="email"
              aria-label="user-email"
            />
          </div>

          <div className="form-input">
            <img src={password_icon} alt="passwordicon" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              id="password"
              aria-label="user-password"
            />
          </div>
        </div>

        <div className="submit-container">
          <Button text="Submit" />
          <Button
            onClick={reportProblem}
            text="Report a problem"
            backgroundColor="#7F7F7F"
          />
        </div>
      </form>
    </div>
  );
}

export default LogIn;
