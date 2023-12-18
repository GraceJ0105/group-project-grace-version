import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  // Page loads and shows Dashboard screen

  test("loads and displays Dashboard heading", () => {
    // ARRANGE
    render(<Dashboard />);

    // ACT
    const dashboardHeading = screen.getByRole("h1");

    // ASSERT
    expect(dashboardHeading).toHaveTextContent("Dashboard");
  });
});
