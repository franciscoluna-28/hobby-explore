import { AuthError, PostgrestError } from "@supabase/supabase-js";

/**
 * Throws an error that can be used when receiving the API response
 * @params message - A custom error message provided by the server
 */
export function generateError(message: string): never {
  throw new Error(message);
}

// Custom error type support type with support for errors from Supabase
type ErrorResult = {
  message: string;
  success: boolean;
} & Partial<AuthError | PostgrestError>;

/**
 * Generate an error result object with a custom error message and optional error details.
 * The error result object includes the error message, success indicator, and partial details of `AuthError` or `PostgrestError`.
 * @param errorMessage - The custom error message to include in the error result.
 * @param errorDetails - Optional partial details of `AuthError` or `PostgrestError` to inject into the error result.
 * @returns An error result object containing the error message, success indicator, and any additional error details provided.
 */
export function generateErrorResult(
  errorMessage: string,
  errorDetails?: Partial<AuthError | PostgrestError>
): ErrorResult {
  return {
    message: errorMessage,
    success: false,
    ...(errorDetails || {}),
  };
}
