import React from "react";
import Hero from "../assets/images/hero-image.jpg";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <React.Fragment>
      <div
        class="hero min-h-screen"
        style={{ backgroundImage: `url(${Hero})` }}
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">C A N O N - A E 1</h1>
            <p class="mb-5 text-lg prose">
              The Canon-AE1 is now available in store. Get your hands on this
              timeless classic now.
            </p>
            <Link to="/products" class="btn btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <h1 class="my-10 text-5xl font-bold text-center">New Arrivals</h1>
      <div class="carousel carousel-center space-x-10 p-10 bg-stone-900 w-full">
        <div class="card w-96 bg-base-100 shadow-xl carousel-item">
          <figure>
            <img
              src="https://api.lorem.space/image/shoes?w=400&h=225"
              alt="Shoes"
            />
          </figure>
          <div class="card-body bg-slate-900">
            <h2 class="card-title">
              Shoes!
              <div class="badge badge-primary">NEW</div>
            </h2>
            <p class="prose">
              If a dog chews shoes whose shoes does he choose?
            </p>
            <div class="card-actions justify-end mb-2">
              <div class="badge badge-outline">Fashion</div>
              <div class="badge badge-outline">Products</div>
            </div>
            <div class="card-actions justify-end">
              <Link to="/checkout" class="btn btn-secondary hover:shadow-xl hover:shadow-cyan-500/50 transition hover:ease-in-out duration-500 hover:scale-110 hover:translate-y-1">
                Add to cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
