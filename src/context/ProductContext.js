import React from "react";
import { createContext } from "react";
import { baseUrl, apiPath } from "../utils/axios";

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const newArrivals = async () => {
    const response = await baseUrl.get(apiPath.newArrivals);
    return response.data;
  };

  const getAllProducts = async () => {
    const response = await baseUrl.get(apiPath.getAllProducts);
    return response.data;
  };

  const viewIndividual = async (params) => {
    const response = await baseUrl.get(apiPath.getAllProducts, params);
    return response.data;
  };

  const productCall = {
    newArrivals: newArrivals,
    getAllProducts: getAllProducts,
    viewIndividual: viewIndividual,
  };

  return (
    <ProductContext.Provider value={productCall}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
