import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import moonImage from "../../assets/images/moon.png";
import "../Pages.css";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  // Accessing loginStatus from redux store
  const loginStatus = useSelector((state) => state.team.loginStatus);
  // Conditional application to the link 'See your progress' based on the login status
  const linkTo = loginStatus ? "/dashboard" : "/login";
  return (
    <div className="container fullpage">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="pageHeader">Welcome to Run To The Moon!</h1>
        <img className="rotateMoon" src={moonImage} alt="Moon"></img>

        <p>
          At Run to the Moon, we believe in fostering a healthier and happier
          future for our children by making physical activity not just a habit
          but an exciting adventure. Our mission is to inspire and empower kids
          to lead active lifestyles, promoting their overall well-being and
          instilling the joy of movement from an early age. Join us on this
          cosmic adventure where each stride contributes not only to personal
          health but also to a sense of achievement and community.
        </p>
      </section>
      <div className="homePage">
        <h2 className="mt-2">Do You Have A Team?</h2>
        <br />

        <Link to={linkTo}>
          <Button text="See your progress" />
        </Link>
      </div>
      <br />
    </div>
  );
}

export default Home;
