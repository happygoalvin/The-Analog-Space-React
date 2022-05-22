import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useParams } from "react-router-dom";
import { baseUrl, apiPath, getHeaderConfig } from "../utils/axios";
import Loader from "../components/Loader";

export default function OrderDetails() {
  const { order_id } = useParams();
  const [data, setData] = useState([]);
  const [orderInfo, setOrderInfo] = useState({});
  const { userTokens, userInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    let response = await baseUrl.get(
      `${apiPath.getOrders}${order_id}`,
      getHeaderConfig(userTokens.accessToken)
    );
    setData(response.data);
    setOrderInfo(response.data[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userTokens.accessToken) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [userTokens]);

  return !isLoading ? (
    <React.Fragment>
      <div className="container mx-auto font-mono">
        <div className="flex p-12 m-1 border-b border-primary">
          <h3 className="text-4xl">Order Details</h3>
        </div>
        <section className="grid grid-cols-1 p-12 text-xs sm:text-md">
          <p>Order Reference ID: {orderInfo?.order?.id}</p>
          <p>
            Recipient: {userInfo?.first_name} {userInfo?.last_name}
          </p>
          <p>Address Line 1: {orderInfo?.order?.address_line1}</p>
          <p>Address Line 2: {orderInfo?.order?.address_line2}</p>
          <p>Postal Code: {orderInfo?.order?.address_postal_code}</p>
          <p>Status: {orderInfo?.order?.orderStatus?.name}</p>
          <p>Total: ${orderInfo?.order?.total_paid / 100}</p>
        </section>
        <div className="flex p-12 m-1 border-b border-primary">
          <h3 className="text-4xl">Purchases</h3>
        </div>
        <section className="grid grid-cols-4 p-12 text-sm sm:text-md">
          {data?.length > 0
            ? data?.map((each) => {
                return (
                  <React.Fragment key={each.id}>
                    <div className="col-start 1 col-end-2 my-10">
                      <img
                        className="object-cover"
                        src={each.camera.image_url}
                        alt={each.name}
                      />
                    </div>
                    <div className="col-start-2 col-end-5 p-12">
                      <p>{each.camera?.name}</p>
                      <p>{each.camera.type?.name}</p>
                      <p>Quantity: {each.quantity}</p>
                      <p>${(each.camera.cost * each.quantity) / 100}</p>
                    </div>
                  </React.Fragment>
                );
              })
            : ""}
        </section>
      </div>
    </React.Fragment>
  ) : (
    <Loader />
  );
}
