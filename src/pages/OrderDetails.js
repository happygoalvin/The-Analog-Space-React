import React, { useContext, useState } from "react";
import OrderContext from "../context/OrderContext";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { order_id } = useParams();
  const [data, setData] = useState([]);
  const orderCtx = useContext(OrderContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <React.Fragment>
      <p>hello world</p>
    </React.Fragment>
  );
}
