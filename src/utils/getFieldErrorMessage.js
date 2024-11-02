export const getFieldErrorMessage = (errors, fieldName) => {
  const fieldErrors = errors.filter((error) => error.field === fieldName);
  return fieldErrors.length > 0
    ? fieldErrors.map((error) => error.message).join(", ")
    : null;
};
