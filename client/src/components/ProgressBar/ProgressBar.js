import ProgressBar from "react-bootstrap/ProgressBar";
import { useEffect, useState } from "react";
import "./ProgressBar.css";

function TeamProgressBar({ teamName, teamMiles }) {
  const [colour, setColour] = useState(""); 
  // Calculate milesRemaining, ensuring it doesn't go into negative numbers
  const milesRemaining = Math.max(0, 200 - parseInt(teamMiles));

  useEffect(() => {
    // Determine color when teamName changes. Hardcoded in MVP deployment of app
    if (teamName === "Space Cats") {
      setColour("success");
    } else if (teamName === "Star Struck") {
      setColour("warning");
    } else {
      setColour("danger");
    }
  }, [teamName]);
  return (
    <div>
      <p className="text-center milesMessage">
        <span className="teamNameStyle">{teamName}:</span> You have ran{" "}
        {teamMiles} miles so far, you have {milesRemaining} miles to go to reach
        the moon!{" "}
      </p>
      <div className="progressBarImg">
        <p className="text-center barIcons">🌎</p>
        <ProgressBar
          animated
          now={teamMiles}
          variant={colour}
          max="200"
          data-testid="progressBarTest"
        />
        <p className="text-center barIcons">🌙</p>
      </div>
    </div>
  );
}
export default TeamProgressBar;
