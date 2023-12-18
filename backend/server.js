import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

//importing our express app.
const app = express();

//express server middleware for parsing json
app.use(express.json());

//importing cors module for extra security
app.use(cors());

// pulling config data. config.env needs updating on each local machine with personal login & port details
dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  port: process.env.DB_PORT,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


/*this is how we reach the backend server. Whenever we visit the homepage of the backend server, 
we will get a request from the user and send a response thereafter, followed by a message to the user; Hello [..] 
If you enter localhost:8080, then you will see the message below. This is how we make API requests using the express server.*/
app.get("/", (req, res) => {
  res.json("Hello, this is the backend");
});


// get request for all team's total miles to be used in Leaderboard page
app.get("/teammiles", (req, res) => {
  const query = ` SELECT t.TeamName, SUM(mr.MilesCompleted) AS TeamTotalMiles FROM Teams t 
    JOIN MilesRun mr ON t.TeamID = mr.TeamID
    GROUP BY t.TeamName`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// get request for Dashboard page based on global store of team ID once team logged in
app.get("/teamdashboard", (req, res) => {
  const teamId = req.query.teamId;

  const query = `
    SELECT t.TeamName, SUM(mr.MilesCompleted) AS TeamTotalMiles 
    FROM Teams t 
    JOIN MilesRun mr ON t.TeamID = mr.TeamID
    WHERE t.TeamID = ?
    GROUP BY t.TeamName`; 

  db.query(query, [teamId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// query used to post new miles to the DB. TeamID & miles completed are received from the client side on Dashboard page
app.post("/updatedashboard", (req, res) => {
  const query =
    "INSERT INTO MilesRun (`TeamID`, `MilesCompleted`) VALUES(?, ?)";
  const values = [req.body.TeamID, req.body.MilesCompleted];

  db.query(query, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Team miles have been successfully added");
  });
});

// a catch all request for all team credential data which can be mapped over to find correlating team name with password/username submitted
app.get("/teams", (req, res) => {
  const query =
    "SELECT t.TeamName, t.TeamID, tc.Email, tc.Password FROM Teams AS t JOIN TeamCredentials tc ON t.TeamID = tc.TeamID";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


// query used to post waitlist contact details from the Sign Up page to the Waitlist table in the DB
app.post("/addtowaitlist", (req, res) => {
  const query = "INSERT INTO waitlist (`FullName`, `Email`) VALUES(?, ?)";
  const values = [req.body.FullName, req.body.Email];

  db.query(query, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("You're In! And on the waitlist 🎉");
  });
});

app.listen(8080, () => {
  console.log("Connected to backend😁😁!");
});

