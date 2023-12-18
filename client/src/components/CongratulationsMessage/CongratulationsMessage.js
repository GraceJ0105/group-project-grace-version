import congrats from "../../assets/images/congrats.gif";
import "./CongratulationsMessage.css";

function CongratulationsMessage({ teamName, targetTotalMiles }) {
  return (
    <div className="congratulations-container">
      <p>
        Congratulations {teamName}! You've reached the target of{" "}
        {targetTotalMiles} miles!
      </p>
      / {<img src={congrats} alt="fireworks" id="congratsImage"/>}
    </div>
  );
}

export default CongratulationsMessage;
