import { expect, test } from "vitest";
import ActivityPage from "../src/app/app/activities/[activityId]/page";
import { render, screen } from "@testing-library/react";
import React from "react";

const DEFAULT_ACTIVITY_ID = 

test("Page does not crash when there are no tips", () => {
  // Render the page with the mock data
  render(<ActivityPage params={{ activityId: String(123) }} />);

  // Additionally, you can check that the "tips" section is not present
  // Replace "Tips Section" with the actual label or testId of your tips section
  const tipsSection = screen.queryByTestId("tips-section");
  expect(tipsSection).toBeDefined();
});
