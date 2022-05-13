import React, { useContext, useEffect, useState } from "react";
import Hero from "../assets/images/hero-image.jpg";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import { FallingLines } from "react-loader-spinner";

export default function Landing() {
  const [productData, setProductData] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const productCtx = useContext(ProductContext);

  useEffect(() => {
    const fetchNewArrival = async () => {
      let newArrival = await productCtx.newArrivals();
      setProductData(newArrival);
    };
    fetchNewArrival().then(setHasLoaded(true));
    // eslint-disable-next-line
  }, []);

  return hasLoaded ? (
    <React.Fragment>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${Hero})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">C A N O N - A E 1</h1>
            <p className="mb-5 text-lg prose">
              The Canon-AE1 is now available in store. Get your hands on this
              timeless classNameic now.
            </p>
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <h1 className="my-10 text-5xl font-bold text-center">New Arrivals</h1>
      <div className="carousel carousel-center space-x-10 p-10 bg-stone-900 w-full">
        <div className="card w-96 bg-base-100 shadow-xl carousel-item">
          <figure>
            <img
              src="https://api.lorem.space/image/shoes?w=400&h=225"
              alt="Shoes"
            />
          </figure>
          <div className="card-body bg-slate-900">
            <h2 className="card-title">
              Shoes!
              <div className="badge badge-primary">NEW</div>
            </h2>
            <p className="prose">
              If a dog chews shoes whose shoes does he choose?
            </p>
            <div className="card-actions justify-end mb-2">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
            <div className="card-actions justify-end">
              <Link
                to="/checkout"
                className="btn btn-secondary hover:shadow-xl hover:shadow-cyan-500/50 transition hover:ease-in-out duration-500 hover:scale-110 hover:translate-y-1"
              >
                Add to cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <FallingLines height={100} width={110} color="red" />
  );
}
