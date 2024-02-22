import React from "react";
import { render, renderHook, screen } from "@testing-library/react";
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
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

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

    await userEvent.upload(dropzone, file);

    expect(dropzone.files).toHaveLength(1);
    expect(dropzone.files && dropzone.files[0]).toStrictEqual(file);
  });
});

it("A file must be replaced by another one since multiple uploading isn't supported", async () => {
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

  const file1 = new File(["test1"], "test1.png", { type: "image/png" });
  const file2 = new File(["test2"], "test2.png", { type: "image/png" });

  const dropzone = screen.getByTestId("dropzone") as HTMLInputElement;

  await userEvent.upload(dropzone, file1);
  await userEvent.upload(dropzone, file2);

  expect(dropzone.files).toHaveLength(1);
  expect(dropzone.files && dropzone.files[0]).toStrictEqual(file2);
});
