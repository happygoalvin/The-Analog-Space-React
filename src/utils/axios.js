import axios from "axios";

export const baseUrl = axios.create({
  baseURL: "https://the-analog-space.herokuapp.com/api",
});

export const apiPath = {
  newArrivals: "/cameras",
  products: "/cameras/products",
  classification: "/cameras/classifications",
  type: "/cameras/type",
  manufacturer: "/cameras/manufacturer",
  film: "/cameras/films",
  viewProduct: "/cameras/products/",
  login: "/users/login",
  register: "/users/register",
  profile: "/users/profile",
  refreshTokens: "/users/refresh",
  logout: "/users/logout",
  updatePassword: "/users/update",
  deleteAccount: "/users/delete",
  getAllCartItems: "/cart",
  addCartItem: "/cart/add",
  removeCartItem: "/cart/remove",
  addCartQuantity: "/cart/quantity/update",
  minusCartQuantity: "/cart/quantity/remove",
  userCheckout: "/checkout",
  getOrders: "/orders/",
};

export const getHeaderConfig = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
