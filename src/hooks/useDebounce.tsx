export const useDebounce = (callback: () => void, timeout?: number) => {
  const debounce = setTimeout(callback, timeout || 500);
  return () => clearTimeout(debounce);
};
