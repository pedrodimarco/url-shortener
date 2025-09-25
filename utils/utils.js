export const validateUrl = (url) => {
  try {
    new URL(url); // Intenta crear un objeto URL
    return true;
  } catch (err) {
    return false;
  }
};
