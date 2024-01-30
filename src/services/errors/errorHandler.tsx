/**
 * This file contains helper functions for handling PostgreSQL errors.
 * These functions can be used to check if an error is of type PostgrestError
 * and to handle responses accordingly.
 */

import { PostgrestError } from "@supabase/supabase-js";

/**
 * Checks if the provided object is of type PostgrestError.
 * @param obj The object to be checked.
 * @returns True if the object is a PostgrestError, otherwise false.
 */
/* const isError = <T,>(obj: T | PostgrestError): obj is PostgrestError =>
  obj instanceof Object && "message" in obj;
 */
/**
 * Handles the response, returning the PostgrestError object if present.
 * @param response The response object to be handled.
 * @returns The PostgrestError object if an error is present, otherwise null.
 */
/* export const handleSupabaseResponse = <T,>(
  response: T | PostgrestError
): PostgrestError | null => {
  if (isError(response)) {
    return response;
  }
  return null;
}; */
