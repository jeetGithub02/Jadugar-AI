
// This utility is not actively used as the logic is simple enough to be in the component,
// but it's good practice to have a file for such helpers in a larger application.

/**
 * Converts a File object to a base64 encoded string.
 * @param file The file to convert.
 * @returns A promise that resolves with the base64 string.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        // result is a data URL like "data:image/png;base64,iVBORw0KGgo...", we only want the part after the comma
        const result = reader.result as string;
        resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};
