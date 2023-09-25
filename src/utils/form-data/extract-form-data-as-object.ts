/**
 * Extracts data from FormData and returns it as an object.
 *
 * @param {FormData} formData - The FormData object containing data to extract.
 * @returns {Record<string, string>} An object containing extracted data.
 */
function extractFormDataAsObject(formData: FormData): Record<string, string> {
  const dataObject: Record<string, string> = {};

  formData.forEach((value, key) => {
    dataObject[key] = value.toString();
  });

  return dataObject;
}

export { extractFormDataAsObject };
