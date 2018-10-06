export const jsonParse = arg => {
  let parsed;
  try {
    parsed = JSON.parse(arg);
  } catch (e) {
    return null;
  }
  return parsed;
};
