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
  viewProduct: "/cameras/products/:cameraId",
  login: "/users/login",
  register: "/users/register",
  profile: "/users/profile",
  refreshTokens: "/users/refresh",
  logout: "/users/logout",
  updatePassword: "/users/update/:userId",
  deleteAccount: "/users/delete/:userId",
  getAllCartItems: "/cart/",
  addCartItem: "/cart/:userId/:cameraId/add",
  removeCartItem: "/cart/:userId/:cameraId/remove",
  updateCartQuantity: "/cart/:userId/cameraId/quantity/update",
  userCheckout: "/checkout/:userId",
};

export const getHeaderConfig = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

