import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  // Accessing Redux state to check login status
  const loginStatus = useSelector((state) => state.team.loginStatus);
  // Updating Redux store using useDispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // handleLogOut will update redux store so that user is logged out and navigated back to log in page
  const handleLogOut = (event) => {
    event.preventDefault();
    dispatch({
      type: "SET_LOG_OUT",
    });
    navigate("/logIn");
  };

  return (
    <Navbar expand="lg" className="navigation">
      <Container>
        <Link className="appName" to="/">
          Run to the Moon
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="styleLink" to="/">
              Home
            </Link>
            {!loginStatus && (
              <Link className="styleLink" to="/logIn">
                Log In
              </Link>
            )}
            {!loginStatus && (
              <Link className="styleLink" to="/signUp">
                Sign Up
              </Link>
            )}
            <Link className="styleLink" to="/dashboard">
              Dashboard
            </Link>
            <Link className="styleLink" to="/leaderboard">
              Leaderboard
            </Link>
            {loginStatus && (
              <Link className="styleLink" to="/logout" onClick={handleLogOut}>
                Log Out
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
