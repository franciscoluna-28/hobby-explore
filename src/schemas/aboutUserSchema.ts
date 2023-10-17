import { z } from "zod";

// Contract for the schema
interface AboutUserSchema {
  name: string;
  birthDate: Date;
}

// Handles the basic user information
export const AboutUserSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Your name must have at least 1 character!" }),
  birthDate: z.date(),
  home: z.string().min(2, {message: "Your home must have at least 2 characters!"})
});
