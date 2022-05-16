import React, { useState, useEffect, useContext } from "react";
import Loader from "../components/Loader";
import { baseUrl, apiPath } from "../utils/axios";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function ProductDetails() {
  const { camera_id } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    let fetchData = async () => {
      setIsLoading(true);
      const fetchDetails = await baseUrl.get(
        `${apiPath.viewProduct}${camera_id}`
      );
      setProductDetail(fetchDetails.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return !isLoading ? (
    <React.Fragment>
      <main className="container mx-auto">
        <h1>Products</h1>
      </main>
    </React.Fragment>
  ) : (
    <Loader />
  );
}
