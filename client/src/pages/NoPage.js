import React from "react";
import { Link } from "react-router-dom";

function NoPage() {
  return (
    <div className="container">
      <h1>
        Oops! This page does not exist. Go back to{" "}
        <Link to="/">Home Page</Link>
      </h1>
    </div>
  );
}

export default NoPage;
