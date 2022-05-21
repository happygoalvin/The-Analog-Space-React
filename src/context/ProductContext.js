import React, { useState, useEffect, createContext } from "react";
import { baseUrl, apiPath } from "../utils/axios";

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [newArrivalData, setNewArrivalData] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const [type, setType] = useState([]);
  const [classification, setClassification] = useState([]);
  const [film, setFilm] = useState([]);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterState, setFilterState] = useState({
    name: "",
    min_cost: "",
    max_cost: "",
    type_id: "",
    manufacturer_id: "",
    classification_id: [],
    film_id: [],
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

  const resetFilter = async () => {
    let fetchProducts = await baseUrl.get(apiPath.products);
    console.log(fetchProducts.data);
    setProductData(fetchProducts.data);

    setFilterState({
      name: "",
      min_cost: "",
      max_cost: "",
      type_id: "",
      manufacturer_id: "",
      classification_id: [],
      film_id: [],
    });
  };

  const typeOption = type.map((t) => {
    return {
      label: t[1],
      value: t[0],
    };
  });

  const manufacturerOption = manufacturer.map((m) => {
    return {
      label: m[1],
      value: m[0],
    };
  });

  const classificationOption = classification.map((c) => {
    return {
      value: c[0],
      label: c[1],
    };
  });

  const filmOption = film.map((f) => {
    return {
      value: f[0],
      label: f[1],
    };
  });

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
    setProductData: setProductData,
    manufacturer: manufacturer,
    type: type,
    manufacturerOption: manufacturerOption,
    typeOption: typeOption,
    classification: classification,
    classificationOption: classificationOption,
    film: film,
    filmOption: filmOption,
    isLoading: isLoading,
    filterState: filterState,
    setFilterState: setFilterState,
    resetFilter: resetFilter,
  };

  return (
    <ProductContext.Provider value={[landingCall, productCall]}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
