import React, { createContext, useState, useContext, useEffect } from "react";
import { baseUrl, apiPath, getHeaderConfig } from "../utils/axios";
import UserContext from "./UserContext";
import Notify from "simple-notify";
import jwtDecode from "jwt-decode";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { userInfo, userTokens } = useContext(UserContext);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [postCart, setPostCart] = useState({
    cameraId: "",
    quantity: 0,
  });

  useEffect(() => {
    getCart();
    // eslint-disable-next-line
  }, [userInfo, userTokens, cartUpdated, postCart]);

  const getCart = async () => {
    async function getCart() {
      console.log("get Cart start");
      const cart = await baseUrl.get(
        apiPath.getAllCartItems,
        getHeaderConfig(userTokens.accessToken)
      );
      setCart(cart.data);
    }

    if (userInfo && userTokens.accessToken) {
      console.log("activating get cart");
      getCart();
      setCartUpdated(true);
    }

    if (!userInfo || !userTokens) {
      console.log("unable to get cart");
      setCart([]);
      setCartUpdated(false);
    }
  };

  const userCheckout = async () => {
    const stripeSession = await baseUrl.get(
      apiPath.userCheckout,
      getHeaderConfig(userTokens.accessToken)
    );
    window.location.href = stripeSession.data.stripeUrl;
  };

  const addToCart = async (cameraId, quantity) => {
    if (userInfo && userTokens.accessToken) {
      console.log(userTokens.accessToken);
      await baseUrl.post(
        apiPath.addCartItem,
        {
          camera_id: cameraId,
          quantity: quantity,
        },
        getHeaderConfig(userTokens.accessToken)
      );

      setCartUpdated(false);
      new Notify({
        status: "success",
        text: "Added to cart successfully",
        autoclose: true,
        autotimeout: 1500,
      });
    } else {
      new Notify({
        status: "error",
        text: "Unable to add to cart. Please try again or re-login",
        autoclose: true,
        autotimeout: 1500,
      });
      setCartUpdated(false);
      console.log("tokens have expired, unable to add to cart");
    }
  };

  const minusOne = (cameraId, quantity) => {
    if (quantity <= 0 || quantity === "") {
      new Notify({
        status: "warning",
        text: "Quantity cannot be lesser than 0",
        autoclose: true,
        autotimeout: 800,
      });
      setPostCart({
        camera_id: cameraId,
        quantity: "",
      });
    } else {
      let selected = parseInt(quantity - 1);
      setPostCart({
        camera_id: cameraId,
        quantity: selected,
      });
    }
  };

  const plusOne = (cameraId, quantity) => {
    if (quantity === "" || quantity || quantity === 0) {
      new Notify({
        status: "success",
        text: "Quantity added",
        speed: 100,
        autoclose: true,
        autotimeout: 800,
      });
      let selected = parseInt(quantity + 1);
      setPostCart({
        camera_id: cameraId,
        quantity: selected,
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        checkout: userCheckout,
        addToCart: addToCart,
        postCart: postCart,
        setPostCart: setPostCart,
        minusOne: minusOne,
        plusOne: plusOne,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
