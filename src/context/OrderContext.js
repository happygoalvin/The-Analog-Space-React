import React, { useEffect, useState, createContext, useContext } from "react";
import { baseUrl, apiPath, getHeaderConfig } from "../utils/axios";
import UserContext from "./UserContext";

const OrderContext = createContext({});

export const OrderProvider = ({ children }) => {
  const { userTokens } = useContext(UserContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userTokens.accessToken) {
      fetchOrders();
    }
    // eslint-disable-next-line
  }, [userTokens]);

  const fetchOrders = async () => {
    setIsLoading(true);
    let fetchOrder = await baseUrl.get(
      apiPath.getOrders,
      getHeaderConfig(userTokens.accessToken)
    );
    setOrderData(fetchOrder.data);
    setIsLoading(false);
  };

  const orderCall = {
    orders: orderData,
    isLoading: isLoading,
  };

  return (
    <OrderContext.Provider value={orderCall}>{children}</OrderContext.Provider>
  );
};

export default OrderContext;
