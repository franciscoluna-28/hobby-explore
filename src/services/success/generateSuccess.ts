/**
 * Generate a success message object with a custom success message and optional HTTP status code.
 * The success message object includes the success indicator, message, and optional HTTP status code.
 * @param message - The custom success message to include in the success message object.
 * @param statusCode - Optional HTTP status code to include in the success message object.
 * @returns A success message object containing the success indicator, message, and optional HTTP status code.
 */
export function generateSuccessResult(
    message: string,
    statusCode?: number
  ): { success: boolean; message: string; statusCode?: number } {
    return {
      success: true,
      message,
      statusCode: statusCode ?? 201,
    };
  }
  