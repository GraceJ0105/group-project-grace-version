import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TeamProgressBar from "./ProgressBar";

describe("TeamProgressBar", () => {
 
  test("Progress Bar renders", () => {
    // ARRANGE
    const { getByTestId } = render(<TeamProgressBar />);

    // ACT
    const progressBar = getByTestId("progressBarTest");

    // ASSERT
    expect(progressBar).toBeInTheDocument();
  });

  // Mock teamMiles and teamName values
  const teamMiles = "50";
  const teamName = "Space Cats";

  test("renders TeamProgressBar with correct miles remaining", () => {
    //ARRANGE
    const { getByText } = render(
      <TeamProgressBar teamName={teamName} teamMiles={teamMiles} />
    );

    // ACT
    const expectedMilesRemaining = 200 - parseInt(teamMiles);
    const milesRemainingText = getByText(
      `You have ran ${teamMiles} miles so far, you have ${expectedMilesRemaining} miles to go to reach the moon!`
    );

    //ASSERT
    expect(milesRemainingText).toBeInTheDocument();
  });
});
