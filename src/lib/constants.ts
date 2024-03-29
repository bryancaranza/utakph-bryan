// Stores all constant values

export const CONSTANTS = {
  ROUTES: {
    MAIN: "/",
    PAGENOTFOUND: "/pagenotfound",
  },
  ENDPOINTS: {
    PRODUCTS: "/products",
    CATEGORIES: "/categories",
    VIEWED: "/viewed",
  },
  ADMIN: "-Nrog9Ov6lBtCj8cawQi",
};

export const createProductDefaultValues = {
  name: "",
  category: "",
  price: 0,
  option: [""],
  cost: 0,
  stock: 0,
};

export const modalDefaultValues = {
  open: false,
  content: undefined,
};
