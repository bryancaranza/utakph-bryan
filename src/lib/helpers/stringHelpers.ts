export const validateStringToNumber = (word: string) => {
  const replacedNumber = word?.replace(/^0+/, "");

  return parseFloat(replacedNumber);
};
