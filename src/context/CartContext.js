import React, { createContext, useState, useContext, useEffect } from "react";
import { baseUrl, apiPath, getHeaderConfig } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import jwtDecode from "jwt-decode";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { userInfo, userTokens } = useContext(UserContext);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [postCart, setPostCart] = {
    cameraId: "",
    quantity: "",
  };
  const navigate = useNavigate();

  useEffect(() => {
    async function getCart() {
      const cart = await baseUrl.get(
        apiPath.getAllCartItems,
        getHeaderConfig(userTokens.accessToken)
      );
      setCart(cart.data);
    }

    if (userInfo && userTokens) {
      const cart = getCart();
      if (cart) {
        setCart(cart);
        setCartUpdated(false);
      }
    }

    if (!userInfo || !userTokens) {
      setCart([]);
      setCartUpdated(false);
    }
  }, [userInfo, userTokens, cartUpdated]);

  const userCheckout = async () => {
    const stripeSession = await baseUrl.get(
      apiPath.userCheckout,
      getHeaderConfig(userTokens.accessToken)
    );
    window.location.href = stripeSession.data.stripeUrl;
  };

  const addToCart = async () => {};

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        checkout: userCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
