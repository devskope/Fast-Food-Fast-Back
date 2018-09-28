export const jsonParse = arg => {
  let parsed;
  try {
    parsed = JSON.parse(arg);
  } catch (e) {
    console.log(e);
  }
  return parsed;
};
