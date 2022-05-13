import { createContext, useState, useEffect } from "react";
import { baseUrl, apiPath } from "../utils/axios";

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [data, setData] = useState();

  const productCall = {
    newArrivals: async () => {
      const fetchNewArrivals = await baseUrl.get(apiPath.newArrivals);
      return fetchNewArrivals.response.data
    },
    getAllProducts: async () => {
      const fetchAllProducts = await baseUrl.get(apiPath.products);
      return fetchAllProducts.response.data
    },
    viewIndividual: async (params) => {
      const fetchViewProduct = await baseUrl.get(apiPath.products, params);
      return fetchViewProduct.response.data;
    }
  };

  return(
      <ProductContext.Provider value={productCall}>
          {children}
      </ProductContext.Provider>
  )
};
