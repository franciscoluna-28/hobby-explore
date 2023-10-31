import { z } from "zod";

// Define a schema for the user's personal information.
export const AboutUserSchema = z.object({
  name: z.string().min(2, "The name must have at least 2 characters."),
  birthDate: z.date().refine((date) => {
    // Calculate the user's age based on their birth date.
    const today = new Date();
    const userAge = today.getFullYear() - date.getFullYear();
    // Check if the user is at least 16 years old.
    return userAge >= 16;
  }, "You must be at least 16 years old to register."),
  home: z.string().min(2, "The home must have at least 2 characters."),
});
