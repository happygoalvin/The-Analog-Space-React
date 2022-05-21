import React, { useContext } from "react";
import ProductContext from "../context/ProductContext";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { getManufacturerName, getTypeName } from "../utils/helper";

export default function Products() {
  const navigate = useNavigate();
  const [, productCall] = useContext(ProductContext);

  const viewDetails = (p) => {
    navigate(`/products/${p}`);
  };

  

  return !productCall.isLoading ? (
    <React.Fragment>
      <div className="container mx-auto overflow-x-hidden">
        <div className="bg-base-100">
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* <!-- Page content here --> */}
              <div className="flex justify-evenly pt-10 sm:pt-10 lg:pt-10">
                <span className="prose text-slate-300 text-md text-semibold">
                  Showing {productCall.products.length} result(s)
                </span>
                <h1 className="text-2xl text-bold hidden lg:block mr-12">
                  All Products
                </h1>
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
              <div className="divider"></div>
              <div className="flex justify-evenly flex-wrap pt-4">
                {productCall.products.map((p) => {
                  return (
                    <React.Fragment key={p.id}>
                      <div className="card sm:w-64 md:w-72 lg:w-96 bg-base-100 shadow-xl shadow-orange-400/60 lg:ml-20 mt-10">
                        <figure className="md:max-h-42 lg:max-h-80">
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
                                : null}
                            </div>
                            <div className="badge badge-outline">
                              {productCall.type
                                ? getTypeName(productCall.type, p.type_id)
                                : null}
                            </div>
                          </div>
                          <p className="prose overflow-y-hidden max-h-28">
                            {p.description}
                          </p>
                          <div className="card-actions justify-end mt-2">
                            <p className="justify-start text-lg md:text-xl lg:text-2xl font-semibold pt-2">
                              ${p.cost / 100}
                            </p>
                            <button
                              onClick={() => {
                                viewDetails(p.id);
                              }}
                              className="btn btn-sm md:btn-md btn-secondary hover:shadow-lg hover:shadow-cyan-400/60 transition hover:ease-in-out duration-500 hover:scale-110 hover:translate-y-1"
                            >
                              View Product
                            </button>
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
              <div className="menu p-4 overflow-y-auto overflow-x-hidden w-80 bg-base-100 text-base-content">
                {/* <!-- Sidebar content here --> */}
                <div className="overflow-y-scroll">
                  <h1 className="font-mono text-2xl ml-1 mt-8">Filter By</h1>
                  <div className="mt-2 ml-1">
                    <label className="label">
                      <span className="label-text text-md">Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={productCall.filterState.name}
                      onChange={(e) => {
                        productCall.setFilterState({
                          ...productCall.filterState,
                          name: e.target.value,
                        });
                      }}
                      placeholder="Filter by name..."
                      className="input input-bordered input-primary w-full max-w-xs"
                    />
                  </div>
                  <div className="sm:flex block">
                    <div className="mt-2 ml-1">
                      <label className="label">
                        <span className="label-text text-md">Min cost</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Min cost"
                        name="min_cost"
                        value={productCall.filterState.min_cost}
                        onChange={(e) => {
                          productCall.setFilterState({
                            ...productCall.filterState,
                            min_cost: e.target.value,
                          });
                        }}
                        className="input input-bordered input-primary w-full sm:w-9/12 max-w-xs"
                      />
                    </div>
                    <div className="mt-2 ml-1">
                      <label className="label">
                        <span className="label-text text-md">Max cost</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Max cost"
                        name="max_cost"
                        value={productCall.filterState.max_cost}
                        onChange={(e) => {
                          productCall.setFilterState({
                            ...productCall.filterState,
                            max_cost: e.target.value,
                          });
                        }}
                        className="input input-bordered input-primary w-full sm:w-9/12 max-w-xs"
                      />
                    </div>
                  </div>

                  {/* <div className="collapse collapse-plus mt-6">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title rounded-box border border-primary text-base-content">
                      Type
                    </div>
                    {productCall.type.length > 0 ? productCall.type.map((type) =>
                      <div className="collapse-content bg-outline text-primary-content peer-checked:bg-base-100 peer-checked:text-base-content ">
                        <div className="form-control">
                          <label className="label cursor-pointer">
                            <span className="label-text">{type[1]}</span>
                            <input
                              type="checkbox"
                              name="type"
                              value={type[0]}
                              onChange={(e) => {
                                productCall.setFilterState({
                                  ...productCall.filterState,
                                  type_id: e.target.value
                                })
                              }}
                              className="checkbox checkbox-sm checked:bg-red-500 my-2"
                              
                            />
                          </label>
                        </div>
                      </div>
                    ) : ""}
                  </div>
                  <div className="collapse collapse-plus transition ease-in-out duration-300 mt-6">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title bg-base-100 border-primary border rounded-box text-base-content">
                      Brand
                    </div>
                    <div className="collapse-content text-primary-content peer-checked:bg-base-100 peer-checked:text-base-content">
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text">Red pill</span>
                          <input
                            type="radio"
                            name="radio-6"
                            className="radio radio-sm checked:bg-red-500 my-2"
                            checked
                          />
                        </label>
                        <label className="label cursor-pointer">
                          <span className="label-text">blue pill</span>
                          <input
                            type="radio"
                            name="radio-6"
                            className="radio radio-sm checked:bg-blue-500"
                            checked
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="collapse collapse-plus mt-6">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title border border-primary bg-base-100 text-base-content rounded-box">
                      Classifications
                    </div>
                    <div className="collapse-content text-primary-content peer-checked:bg-base-100 peer-checked:text-base-content">
                      <div className="form-control">
                        <label className="cursor-pointer label">
                          <span className="label-text">Remember me</span>
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm checkbox-primary"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="collapse collapse-plus mt-6">
                      <input type="checkbox" className="peer" />
                      <div className="collapse-title bg-base-100 border border-primary text-base-content rounded-box">
                        Films
                      </div>
                      <div className="collapse-content text-primary-content peer-checked:bg-base-100 peer-checked:text-base-content">
                        <div className="form-control">
                          <label className="cursor-pointer label">
                            <span className="label-text">Remember me</span>
                            <input
                              type="checkbox"
                              className="checkbox checkbox-sm checkbox-primary"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* FILTER BY TYPE, MANUFACTURER, CLASSIFICATION, FILM END */}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Loader />
  );
}
