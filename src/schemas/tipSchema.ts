import z from "zod";

// Schema to validate tips in the client side
const tipSchema = z.object({
    text: z.string().min(10, {
      message: "Activity name must be at least 10 characters.",
    }),
    url: z
      .string()
      .url({
        message: "Please enter a valid URL.",
      })
      .max(255, {
        message: "URL is too long. A maximum of 255 characters is allowed.",
      }),
  });

export { tipSchema }