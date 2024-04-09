import { checkIfUsernameIsAvailableInDatabaseAction } from "@/actions/user/actions";
import { z } from "zod";

const MIN_USERNAME_LENGTH = 8;
const MAX_USERNAME_LENGTH = 20;
const USERNAME_PATTERN_ERROR_MESSAGE =
  "Your username can only contain letters and numbers.";

// Define the schema for the username
export const UserSchema = z.object({
  username: z
    .string()
    .min(
      MIN_USERNAME_LENGTH,
      `Your username must be at least ${MIN_USERNAME_LENGTH} characters long.`
    )
    .max(
      MAX_USERNAME_LENGTH,
      `Your username cannot exceed ${MAX_USERNAME_LENGTH} characters.`
    )
    .regex(/^[a-zA-Z0-9]+$/, USERNAME_PATTERN_ERROR_MESSAGE)
    .refine(async (e) => {
      // Where checkIfEmailIsValid makes a request to the backend
      // to see if the email is valid.
      return await checkIfUsernameIsAvailableInDatabaseAction(e);
    }, "This username is not available"),
});
