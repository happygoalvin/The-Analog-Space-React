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
  viewProduct: "/cameras/products/:camera_id",
  login: "/users/login",
  register: "/users/register",
  profile: "/users/profile",
  refreshTokens: "/users/refresh",
  logout: "/users/logout",
  updatePassword: "/users/update",
  deleteAccount: "/users/delete/",
  getAllCartItems: "/cart",
  addCartItem: "/cart/add/:camera_id",
  removeCartItem: "/cart/remove/:camera_id",
  updateCartQuantity: "/cart/quantity/update/:camera_id",
  userCheckout: "/checkout",
};

export const getHeaderConfig = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

