export const generateNIM = () => {
  const timestamps = Date.now().toString(); // get timestamp in miliseconds
  const randomNumber = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digits random number
  return timestamps + randomNumber; // concatenate timestamp and random number
};
