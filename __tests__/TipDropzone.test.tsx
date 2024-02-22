import React from "react";
import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TipDropzone } from "../src/components/create-activity/TipDropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ActivitySchema from "../src/schemas/activities/ActivitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DEFAULT_ACCESSIBILITY_MAX_VALUE,
  DEFAULT_ACCESSIBILITY_MIN_VALUE,
} from "../src/constants/activities/form";
import { MAXIMUM_ALLOWED_TIPS } from "../src/constants/tips/globals";

const TIPS_ARRAY = Array.from({ length: MAXIMUM_ALLOWED_TIPS }, () => ({
  description: undefined,
  imageFile: undefined,
}));

describe("TipDropzone", () => {
  it("should render correctly and handle file drop", async () => {
    const { result } = renderHook(() =>
      useForm<z.infer<typeof ActivitySchema>>({
        resolver: zodResolver(ActivitySchema),
        defaultValues: {
          tips: TIPS_ARRAY,
          accessibility: [
            DEFAULT_ACCESSIBILITY_MIN_VALUE,
            DEFAULT_ACCESSIBILITY_MAX_VALUE,
          ],
        },
      })
    );
    const index = 0;
    const item = { id: "some-id" };

    render(<TipDropzone form={result.current} index={index} item={item} />);

    expect(result.current).toBeDefined();
    expect(screen.getByTestId("dropzone")).toBeDefined();

    const file = new File(["test"], "test.png", { type: "image/png" });
    const dropzone = screen.getByTestId("dropzone") as HTMLInputElement;
    userEvent.upload(dropzone, file);
  });
});
