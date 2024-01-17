import z from "zod";

/**
 * Regular expression pattern for valid characters in the string.
 * @type {RegExp}
 */
const validCharactersRegex: RegExp = /^[a-zA-Z0-9-_.]+$/;

/**
 * Zod schema for validating strings with specific characters to avoid scripts.
 *
 * @type {import("zod").StringType}
 */
export const FileStringValidatorSchema = z
  .string()
  .refine((data) => validCharactersRegex.test(data), {
    message:
      "The string should contain only letters (uppercase and lowercase), numbers, underscores (_), hyphens (-), and periods (.)",
  });
