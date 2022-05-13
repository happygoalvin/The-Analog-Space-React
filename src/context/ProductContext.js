import { createContext } from "react";
import { baseUrl, apiPath } from "../utils/axios";

const ProductContext = createContext({});

const ProductProvider = ({ children }) => {
  const productCall = {
    testing: () => {
        console.log("testing");
    },
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

export default ProductProvider;