import { render, screen } from "@testing-library/react";
import ActivityPage from "../src/app/app/activities/[activityId]/page";

const NON_EXISTENT_ACTIVITY_ID = 123456789;

// TODO: Fix component errors regarding cookies
describe("ActivityPage", () => {
  it("The page must render an error message if the activity doesn't exist", async () => {
    render(
      await ActivityPage({
        params: { activityId: String(NON_EXISTENT_ACTIVITY_ID) },
      })
    );

    const error = screen.getByText("Error fetching activity.");

    expect(error).toBeDefined();
  });
});
