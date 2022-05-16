import React, { createContext, useState, useContext, useEffect } from "react";
import { baseUrl, apiPath, getHeaderConfig } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { userInfo, getAuth } = useContext(UserContext);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [stripeSession, setStripeSession] = useState(null);
  const [outOfStock, setOutOfStock] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCart() {
      const cart = await baseUrl.get(
        apiPath.getAllCartItems,
        getHeaderConfig(getAuth.accessToken)
      );
      setCart(cart.data);
    }

    if (userInfo && getAuth) {
      const cart = getCart();
      if (cart) {
        setCart(cart);
        setCartUpdated(false);
      }
    }

    if (!userInfo || !getAuth) {
      setCart({});
      setCartUpdated(false);
    }
  }, [userInfo, getAuth, cartUpdated]);


  useEffect(() => {
    //   async function checkout() {
    //       const stripe = await 
    //   }
  })

  return <CartContext.Provider value="">{children}</CartContext.Provider>;
};

export default CartContext;
