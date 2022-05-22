import React, { useContext } from "react";
import OrderContext from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();
  const orderCtx = useContext(OrderContext);

  return (
    <React.Fragment>
      <section className="container mx-auto">
        <div className="flex justify-center mt-12">
          <h1 className="text-4xl font-mono">Order History</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table-compact w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Date</th>
                <th>Total</th>
                <th>Order Details</th>
              </tr>
            </thead>
            {orderCtx?.orders.length > 0
              ? orderCtx?.orders.map((o) => {
                  return (
                    <React.Fragment key={o.id}>
                      <tbody>
                        <tr className="hover border border-primary">
                          <th className="font-normal border border-primary">
                            {o.id}
                          </th>
                          <th className="font-normal border border-primary">
                            {o.orderStatus.name}
                          </th>
                          <th className="font-normal border border-primary">
                            {o.order_date.slice(0, 10)}
                          </th>
                          <th className="font-normal border border-primary">
                            ${o.total_paid / 100}
                          </th>
                          <th>
                            <button
                              onClick={() => {
                                navigate(`/orders/${o.id}`);
                              }}
                              className="btn border border-primary btn-sm btn-primary my-1 hover:shadow-lg hover:shadow-cyan-400/60 transition hover:ease-in-out duration-500"
                            >
                              View
                            </button>
                          </th>
                        </tr>
                      </tbody>
                    </React.Fragment>
                  );
                })
              : ""}
          </table>
        </div>
      </section>
    </React.Fragment>
  );
}
