export const getAgeLimit = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 15);
  return today.toISOString().split("T")[0];
};
