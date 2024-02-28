// Stores all global functions mostly for formatting strings

// input validator removes 0 from 054 then convert to number
export const validateStringToNumber = (word: string) => {
  const replacedNumber = word?.replace(/^0+/, "");

  return parseFloat(replacedNumber);
};

// price formatting from number to string
export const formatCurrency = (price: number, currency?: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "PHP",
  }).format(price);
};
