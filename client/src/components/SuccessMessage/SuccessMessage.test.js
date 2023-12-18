import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux"; // Import the Provider
import "@testing-library/jest-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";



describe("Success Message rendering on Dashboard Page", () => {
  //Mock submission data
  const teamSubmissionData = {
    TeamID: 1, 
    MilesCompleted: 6,
  };
  // Mock axios before importing Dashboard
  jest.mock("axios", () => ({
    post: jest.fn(() => Promise.resolve({ data: { success: true } })),
    get: jest.fn(() => Promise.resolve({ data: [] })),
  }));

  // Mock the Redux store
  const mockStore = configureStore([]);
  const store = mockStore({
    team: { loginStatus: true, name: "Test Team", id: 1 },
  });
  test("miles submitted and message renders", async () => {
    // ARRANGE
    render(
      // Wrapping Dashboard with Provider and provide the Redux store
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    const milesSubmissionButton = screen.getByRole("button", {
      name: "submit",
    });
    const newMiles = screen.getByRole("input", { name: /MilesCompleted/i });
    fireEvent.change(newMiles, {
      target: { value: `${teamSubmissionData.MilesCompleted}` },
    });

    // ACT
    expect(
      screen.queryByText(
        `You are now ${teamSubmissionData.MilesCompleted} miles closer to these astronauts`
      )
    ).toBeNull();

    fireEvent.click(milesSubmissionButton);

    // ASSERT
    await waitFor(() => {
      expect(screen.queryByText).toHaveTextContent(
        `You are now ${teamSubmissionData.MilesCompleted} miles closer to these astronauts`
      );
    });
  });
});
