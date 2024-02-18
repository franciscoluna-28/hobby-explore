export function dataURLtoFile(dataURL: string, filename: string): File {
  // Validate input values
  if (!dataURL.startsWith("data:")) {
    throw new Error('Invalid dataURL format. Must start with "data:"');
  }

  // Parse dataURL components
  const parts = dataURL.split(",");
  const mimeType = parts[0].match(/:(.*?);/)![1]; // Ensure it matches
  const base64EncodedData = parts[1];

  // Decode base64 string
  const decodedData = atob(base64EncodedData);
  const arrayBuffer = new ArrayBuffer(decodedData.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  // Convert base64 string to binary data
  for (let i = 0; i < decodedData.length; i++) {
    uint8Array[i] = decodedData.charCodeAt(i);
  }

  // Create File object with explicit type and filename
  return new File([uint8Array], filename, { type: mimeType });
}

export async function readFileAsDataURL(file: File) {
  let result_base64 = await new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.onload = (e) => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });

  return result_base64;
}
