import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import astronautImage from '../../assets/images/astronaut.png'
import './SuccessMessage.css'

function SuccessMessage({ miles }) {
  const [astronautsData, setAstronautsData] = useState(null);
  const [error, setError] = useState(null);

   // Retrieve team name from the Redux store
   const teamName = useSelector((state) => state.team.name);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://api.open-notify.org/astros.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAstronautsData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs once after the initial render

  return (
    <div>
      {error ? (
        <p>Error fetching data: {error}</p>
      ) : (
        astronautsData && (
          <div className="successMessage">
            {/* Display the team name along with the success message */}
            <p>You are now {miles} miles closer to these astronauts, {teamName}!</p>
            <ul>
              {astronautsData.people.map((person) => (
                <li key={person.name}><img src={astronautImage} alt="astronaut_image"></img>{person.name}</li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}

export default SuccessMessage;