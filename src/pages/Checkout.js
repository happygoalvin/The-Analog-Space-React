import React, { useContext } from "react";
import Notify from "simple-notify";
import CartContext from "../context/CartContext";
import UserContext from "../context/UserContext";
import { apiPath, baseUrl, getHeaderConfig } from "../utils/axios";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const { userTokens } = useContext(UserContext);

  const minus = async (cameraId) => {
    await baseUrl.put(
      apiPath.minusCartQuantity,
      {
        camera_id: cameraId,
      },
      getHeaderConfig(userTokens.accessToken)
    );
    new Notify({
      status: "success",
      text: "Quantity updated",
      autoclose: true,
      autotimeout: 1000,
    });
    cartCtx.setCartUpdated(false);
  };

  const plus = async (cameraId) => {
    await baseUrl.put(
      apiPath.addCartQuantity,
      {
        camera_id: cameraId,
      },
      getHeaderConfig(userTokens.accessToken)
    );
    new Notify({
      status: "success",
      text: "Quantity updated",
      autoclose: true,
      autotime: 1000,
    });
    cartCtx.setCartUpdated(false);
  };

  return (
    <React.Fragment>
      <section className="container mx-auto">
        <div className="flex justify-center mt-12">
          <h1 className="text-6xl font-mono">My Cart</h1>
        </div>
        {cartCtx.cart.length > 0
          ? cartCtx.cart.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <section className="sm:grid sm:grid-cols-4 mt-3 p-12 font-mono">
                    <div className="flex flex-col justify-center">
                      <img
                        className="w-full lg:w-full object-contain"
                        src={item.camera.image_url}
                        alt={item.camera.name}
                      />
                    </div>
                    {/* TITLE START */}
                    <div className="sm:col-start-2 sm:col-end-5 ml-6 mt-12 sm:mt-0 sm:ml-4">
                      <div className="ml-6">
                        <h3 className="text-2xl sm:text-3xl font-semibold">
                          {item.camera.name}
                        </h3>
                        <span className="badge badge-outline badge-primary mt-4">
                          {item.camera.type.name}
                        </span>
                        <span className="badge badge-outline badge-primary ml-2">
                          {item.camera.manufacturer.name}
                        </span>
                      </div>
                      {/* TITLE END */}
                      {/* Quantity START */}
                      <div className="flex justify-between sm:justify-start mt-5 sm:mt-4 ml-6">
                        <div>
                          <button
                            onClick={() => {
                              minus(item.camera_id);
                            }}
                            className="hover:text-primary"
                          >
                            <i className="fa-solid fa-minus pr-2"></i>
                          </button>
                          <input
                            type="text"
                            placeholder="0"
                            name="quantity"
                            value={item.quantity}
                            disabled
                            className="input input-bordered input-primary w-12 h-10 max-w-xs disabled:border disabled:border-primary disabled:text-slate-300 disabled:cursor-default"
                          />
                          <button
                            onClick={() => {
                              plus(item.camera_id);
                            }}
                            className="hover:text-primary"
                          >
                            <i className="fa-solid fa-plus pl-2"></i>
                          </button>
                        </div>
                        {/* QUANTITY END */}
                        {/* DELETE START */}
                        <button
                          onClick={() => {
                            cartCtx.removeFromCart(item.camera_id);
                          }}
                          className="sm:ml-12 mr-6 p-2 rounded-md border border-primary hover:bg-primary hover:text-primary-content ease-in-out duration-200"
                        >
                          <span className="pr-1">Remove</span>
                          <i className="fa-solid fa-trash-can pr-1"></i>
                        </button>
                        {/* DELETE END */}
                      </div>
                      {/* SUBTOTAL START */}
                      <div className="ml-6 mt-6">
                        <p className="text-xl font-semibold">
                          SGD {(item.camera.cost / 100) * item.quantity}
                        </p>
                      </div>
                      {/* SUBTOTAL END */}
                    </div>
                  </section>
                  <div className="divider"></div>
                </React.Fragment>
              );
            })
          : ""}
        <div className="flex justify-end sm:justify-center">
          <button
            onClick={() => {
              cartCtx.checkout();
            }}
            className="btn btn-primary m-6 sm:m-10 sm:w-full hover:shadow-lg hover:shadow-cyan-400/60 transition hover:ease-in-out duration-500 hover:scale-110 hover:translate-y-1"
          >
            Checkout
          </button>
        </div>
      </section>
    </React.Fragment>
  );
}
