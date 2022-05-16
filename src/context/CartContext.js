import React, { createContext, useState, useContext, useEffect } from "react";
import { baseUrl, apiPath, getHeaderConfig } from "../utils/axios";
import UserContext from "./UserContext";
import jwtDecode from "jwt-decode";
import axios from "axios";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { userInfo, userTokens } = useContext(UserContext);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [postCart, setPostCart] = {
    cameraId: "",
    quantity: "",
  };

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

  const addToCart = async (cameraId, quantity) => {
    if (userInfo && userTokens) {
    await baseUrl.post(apiPath.addCartItem, {
      id: userInfo.id,
      camera_id: cameraId,
      quantity: quantity
    })
    setPostCart({
      cameraId: cameraId,
      quantity: quantity
    })
  } else {
    console.log("tokens have expired, unable to add to cart")
  }
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        checkout: userCheckout,
        addToCart: addToCart,
        postCart: postCart,
        setPostCart: setPostCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
