import z from "zod";

const MIN_STRING_VALUE: number = 20;
const MAX_STRING_VALUE: number = 100;

export const UserDescriptionSchema = z
  .string()
  .min(MIN_STRING_VALUE, {
    message: `Description must be at least ${MIN_STRING_VALUE} characters`,
  })
  .max(MAX_STRING_VALUE, {
    message: `Description must be at most ${MAX_STRING_VALUE} characters`,
  });
