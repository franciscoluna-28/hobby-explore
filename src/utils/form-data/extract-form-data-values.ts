/**
 * Extracts values from a FormData object that have keys starting with a given prefix.
 *
 * @param {FormData} formData - The FormData object to extract values from.
 * @param {string} keyPrefix - The prefix of keys to filter and extract values for.
 * @returns {Record<string, string>} An object containing extracted key-value pairs.
 */
function extractFormDataValues(
  formData: FormData,
  keyPrefix: string
): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith(keyPrefix)) {
      values[key] = value.toString();
    }
  }

  return values;
}

export { extractFormDataValues };
