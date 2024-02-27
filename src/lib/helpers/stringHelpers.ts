export const validateStringToNumber = (word: string) => {
  const replacedNumber = word?.replace(/^0+/, "");

  return parseFloat(replacedNumber);
};

export const formatCurrency = (price: number, currency?: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "PHP",
  }).format(price);
};
