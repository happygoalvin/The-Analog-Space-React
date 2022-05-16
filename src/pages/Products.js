import React, { useContext } from "react";
import ProductContext from "../context/ProductContext";
import Loader from "../components/Loader";
import { useNavigate, Link } from "react-router-dom";
import { getManufacturerName, getTypeName } from "../utils/helper";

export default function Products() {
  const [, productCall] = useContext(ProductContext);

  return !productCall.isLoading ? (
    <React.Fragment>
      <div className="bg-base-100">
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* <!-- Page content here --> */}
            <div className="flex justify-between">
              <span className="prose text-slate-300 text-lg text-bold">
                showing {productCall.products.length} products
              </span>
              <h1 className="text-2xl text-bold">All Products</h1>
              <label htmlFor="my-drawer-4" className="drawer-button">
                <svg
                  version="1.0"
                  width="30px"
                  height="30px"
                  fill="#cbd5e1"
                  viewBox="0 0 200 200"
                  data-name="Layer 1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title />
                  <path d="M110.22,117.75h-80a10,10,0,0,0,0,20h80a10,10,0,0,0,0-20Z" />
                  <path d="M177.22,125.75a9.67,9.67,0,0,0-14,0l-8,7.5V42.75a10,10,0,0,0-20,0v113.5a8.29,8.29,0,0,0,3,8,9.67,9.67,0,0,0,14,0l24.5-24.5a10.13,10.13,0,0,0,.5-14Z" />
                  <path d="M110.22,37.75h-80a10,10,0,0,0,0,20h80a10,10,0,0,0,0-20Z" />
                  <path d="M30.22,97.75h70a10,10,0,0,0,0-20h-70a10,10,0,0,0,0,20Z" />
                </svg>
              </label>
            </div>
            <div className="flex justify-evenly flex-wrap mt-24 pt-24">
              {productCall.products.map((p) => {
                return (
                  <React.Fragment key={p.id}>
                    <div className="card w-96 bg-base-100 shadow-xl shadow-orange-400/60">
                      <figure className="max-h-80">
                        <img src={p.image_url} alt={p.name} />
                      </figure>
                      <div className="card-body bg-slate-900">
                        <h2 className="card-title">{p.name}</h2>
                        <div className="card-actions justify-start my-1">
                          <div className="badge badge-primary">
                            {productCall.manufacturer
                              ? getManufacturerName(
                                  productCall.manufacturer,
                                  p.manufacturer_id
                                )
                              : ""}
                          </div>
                          <div className="badge badge-outline">
                            {productCall.type
                              ? getTypeName(productCall.type, p.type_id)
                              : ""}
                          </div>
                        </div>
                        <p className="prose overflow-y-hidden max-h-28">
                          {p.description}
                        </p>
                        <div className="card-actions justify-end mt-2">
                          <p className="justify-start text-2xl font-semibold pt-2">
                            ${p.cost / 100}
                          </p>
                          <Link
                            to="/checkout"
                            className="btn btn-secondary hover:shadow-lg hover:shadow-cyan-400/60 transition hover:ease-in-out duration-500 hover:scale-110 hover:translate-y-1"
                          >
                            Add to cart
                          </Link>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
              {/* <!-- Sidebar content here --> */}
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Loader />
  );
}
