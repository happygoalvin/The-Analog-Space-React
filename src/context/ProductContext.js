import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { baseUrl, apiPath } from "../utils/axios";

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [newArrivalData, setNewArrivalData] = useState([]);
  const [manufacturer, setManufacturer] = useState();
  const [type, setType] = useState({});
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let fetchProducts = await baseUrl.get(apiPath.products);
      setProductData(fetchProducts.data);
    };
    fetchData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let fetchManufacturer = await baseUrl.get(apiPath.manufacturer);
      setManufacturer(fetchManufacturer.data);
    };
    fetchData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let fetchTypes = await baseUrl.get(apiPath.type);
      setType(fetchTypes.data);
    };
    fetchData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let fetchNewArrival = await baseUrl.get(apiPath.newArrivals);
      setNewArrivalData(fetchNewArrival.data);
    };
    fetchData();
    setIsLoading(false);
  }, []);

  const landingCall = {
    newArrival: newArrivalData,
    manufacturer: manufacturer,
    type: type,
    isLoading: isLoading,
  };

  

  const productCall = {
    products: productData,
    manufacturer: manufacturer,
    type: type,
    isLoading: isLoading,
  };

  return (
    <ProductContext.Provider value={[landingCall, productCall]}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
