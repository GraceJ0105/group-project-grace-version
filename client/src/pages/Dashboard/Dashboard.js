import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TeamProgressBar from "../../components/ProgressBar/ProgressBar";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";
import Button from "../../components/Button/Button";
import axios from "axios";
import "../Pages.css";
import "./Dashboard.css"
import largeAstronaut from "../../assets/images/largeAstronautImg.png";
import CongratulationsMessage from "../../components/CongratulationsMessage/CongratulationsMessage";


function Dashboard() {
  // Accessing loginStatus from redux store
  const loginStatus = useSelector((state) => state.team.loginStatus);
  // newSubmission useState required for conditional rendering of the Astronaut success message
  const [newSubmission, setNewSubmission] = useState(false);
  // useState of total miles, fetching from DB in function fetchTeamMiles
  const [totalMiles, setTotalMiles] = useState(null);
  // Accessing the team name from Redux state
  const teamName = useSelector((state) => state.team.name);
  // Accessing teamID from redux store
  const teamID = useSelector((state) => state.team.id);
  // Team data required to update the MilesCompleted table in the DB
  const [teamSubmissionData, setTeamSubmissionData] = useState({
    TeamID: teamID,
    MilesCompleted: 0,
  });
  // Target total miles to complete the challenge, required for conditional rendering
  const targetTotalMiles = 200;

  // useEffect applied outside of defined fetchTeamMiles so that fetchTeamMiles can be called within handleSubmission also
  useEffect(() => {
    fetchTeamMiles();
    // comment below added to disable warning of empty array
    // eslint-disable-next-line
  }, []);

  // using teamID redux state to fetch total miles of the team that is currently logged in
  const fetchTeamMiles = async () => {
    try {
      const res = await axios.get("http://localhost:8080/teamdashboard", {
        params: { teamId: teamID },
      });
      // console.log(res.data);
      setTotalMiles(res.data[0].TeamTotalMiles);
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

  // Conditional rendering of Dashboard, checking redux for login status. If they are not logged in, directed back to login page
  if (!loginStatus) {
    return (
      <div className="fullpage dashboardError">
        <h1>
          You need to Log In to see your Team Dashboard.
          <br />
          Please head to <Link to="/logIn">Log In</Link>
        </h1>
        <div className="threeAstronauts">
          <img src={largeAstronaut} alt="astronaut_icon"></img>
          <img src={largeAstronaut} alt="astronaut_icon"></img>
          <img src={largeAstronaut} alt="astronaut_icon"></img>
        </div>
      </div>
    );
  }

  // Submission of new miles to database
  const handleSubmission = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/updatedashboard",
        teamSubmissionData
      );
      setTotalMiles(
        (prevMiles) => prevMiles + parseInt(teamSubmissionData.MilesCompleted)
      );
      console.log("Server response:", response.data);
      setNewSubmission(true);
      // Fetch updated total miles after submission
      await fetchTeamMiles();
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
  // setting submission data based on changes in form
  function handleChange(event) {
    event.preventDefault();
    setTeamSubmissionData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    // console.log(teamSubmissionData);
  }

  return (
    <div className="container fullpage dashboardPage">
      <h1 className="pageHeader">{teamName} Team Dashboard</h1>
      <div className="teamProgressBar">
        <TeamProgressBar teamName={teamName} teamMiles={totalMiles} />
      </div>
      <p className="text-center dashRequest">
        Do you have new miles to submit?
      </p>
      <form className="dashboardForm" onSubmit={handleSubmission}>
        <div className="milesInput">
          <label className="form-label">Enter new miles: </label>
          <input
            type="number"
            name="MilesCompleted"
            value={teamSubmissionData.MilesCompleted}
            onChange={handleChange}
          />
        </div>
        <Button className="milesSubmitBtn" type="submit" text="Submit" />
      </form>

      {newSubmission && totalMiles >= targetTotalMiles ? ( //conditional rendering based on whether or not the target number of miles has been met
        <div>
          <CongratulationsMessage
            teamName={teamName}
            totalMiles={totalMiles}
            targetTotalMiles={targetTotalMiles}
          />
        </div>
      ) : newSubmission ? (
        <SuccessMessage miles={teamSubmissionData.MilesCompleted} /> //success message rendered when new submission is logged, but target has not been met
      ) : totalMiles >= targetTotalMiles ? (
        <CongratulationsMessage
          teamName={teamName}
          totalMiles={totalMiles}
          targetTotalMiles={targetTotalMiles}
        />
      ) : null}
    </div>
  );
}

export default Dashboard;

