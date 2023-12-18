import React, { useEffect, useState } from "react";
import TeamProgressBar from "../../components/ProgressBar/ProgressBar";
import axios from "axios";
import '../Pages.css'

function Leaderboard() {
  const [teamData, setTeamData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      const fetchTeamData = async () => {
        try {
          const res = await axios.get("http://localhost:8080/teammiles");
          console.log(res.data);
          /* Sort teamData in descending order based on TeamTotalMiles so that 
          leaderboard is rendered from winner to loser */
          const sortedData = res.data.sort(
            (a, b) => b.TeamTotalMiles - a.TeamTotalMiles
          );

          setTeamData(sortedData);
          setDataFetched(true);
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
      fetchTeamData();
    }
  }, [dataFetched]);

 

  return (
    <div className="container fullpage leaderboardPage">
      <h1 className="pageHeader">Leaderboard</h1>
      {teamData.map((team) => (
        <TeamProgressBar
          key={team.TeamID}
          teamName={team.TeamName}
          teamMiles={team.TeamTotalMiles}
        />
      ))}
    </div>
  );
}
export default Leaderboard;
