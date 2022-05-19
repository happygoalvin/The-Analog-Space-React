import React, { useState, useEffect, createContext } from "react";
import { baseUrl, apiPath } from "../utils/axios";

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [newArrivalData, setNewArrivalData] = useState([]);
  const [manufacturer, setManufacturer] = useState({});
  const [type, setType] = useState({});
  const [classification, setClassification] = useState({});
  const [film, setFilm] = useState({});
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterState, setFilterState] = useState({
    name: "",
    min_cost: "",
    max_cost: "",
    type_id: "",
    manufacturer_id: "",
    classification_id: "",
    film_id: "",
  });

  const fetchData = async () => {
    setIsLoading(true);
    let fetchProducts = await baseUrl.get(apiPath.products);
    console.log(fetchProducts.data);
    setProductData(fetchProducts.data);

    let fetchManufacturer = await baseUrl.get(apiPath.manufacturer);
    setManufacturer(fetchManufacturer.data);

    let fetchTypes = await baseUrl.get(apiPath.type);
    setType(fetchTypes.data);

    let fetchClassifications = await baseUrl.get(apiPath.classification);
    setClassification(fetchClassifications.data);

    let fetchFilms = await baseUrl.get(apiPath.film);
    setFilm(fetchFilms.data);

    let fetchNewArrival = await baseUrl.get(apiPath.newArrivals);
    setNewArrivalData(fetchNewArrival.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
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
    classification: classification,
    film: film,
    isLoading: isLoading,
    filterState: filterState,
    setFilterState: setFilterState,
  };

  return (
    <ProductContext.Provider value={[landingCall, productCall]}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
