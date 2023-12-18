-- MySQL Database - for team to have sight of and replicate on their own local machines


CREATE DATABASE RunToTheMoon;
USE RunToTheMoon;

-- Table to store team information
CREATE TABLE Teams (
    TeamID INT PRIMARY KEY AUTO_INCREMENT,
    TeamName VARCHAR(50) UNIQUE NOT NULL
);

-- Table to store team login credentials
CREATE TABLE TeamCredentials (
    CredentialID INT PRIMARY KEY AUTO_INCREMENT,
    TeamID INT,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FOREIGN KEY (TeamID) REFERENCES Teams(TeamID)
);

-- Table to store information about the miles run by each team
CREATE TABLE MilesRun (
    RunID INT PRIMARY KEY AUTO_INCREMENT,
    TeamID INT,
    MilesCompleted DECIMAL(5,2) NOT NULL,
    SubmissionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (TeamID) REFERENCES Teams(TeamID)
);

CREATE TABLE Waitlist (
    FullName VARCHAR (255) NOT NULL,
	Email VARCHAR(255) UNIQUE NOT NULL, 
    PRIMARY KEY (FullName, Email));

INSERT INTO Teams(TeamName)
 VALUES 
  ("Space Cats"),
  ("The Racers"),
  ("Star Struck");

INSERT INTO TeamCredentials (TeamID, Email, Password) 
VALUES
("1","spacecats@gmail.com","wearethebest123"),
("2","theracers@gmail.com","champions54321!"),
("3","starstruck@hotmail.com","789winners");

INSERT INTO MilesRun (TeamID, MilesCompleted) 
VALUES
("1", 20),
("2", 32),
("3", 12);

-- GET Query to get the total miles run by each team
SELECT t.TeamName, SUM(mr.MilesCompleted) AS TeamTotalMiles
FROM Teams t
JOIN MilesRun mr ON t.TeamID = mr.TeamID
GROUP BY t.TeamName;

-- GET Query to get login credentials for each team
SELECT t.TeamName, tc.Email, tc.Password
FROM Teams AS t
JOIN TeamCredentials tc ON t.TeamID = tc.TeamID; 


