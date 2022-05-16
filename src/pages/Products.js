import React, { useContext } from "react";
import ProductContext from "../context/ProductContext";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [, productCall] = useContext(ProductContext);

  return !productCall.isLoading ? (
    <React.Fragment>
      <div className="bg-base-100">
        <div className="ml">Showing {productCall.products.length} products</div>
      </div>
    </React.Fragment>
  ) : (
    <Loader />
  );
}
