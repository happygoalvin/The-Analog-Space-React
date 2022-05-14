import React, { useContext } from "react";
import Hero from "../assets/images/hero-image.jpg";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import Loader from "../components/Loader";
import { getManufacturerName } from "../utils/helper";

export default function Landing() {
  const [landingCall] = useContext(ProductContext);

  return !landingCall.isLoading ? (
    <React.Fragment>
      {/****************** HERO SEGMENT START *********************/}
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
      {/****************** HERO SEGMENT END ************************/}

      {/************************* NEW ARRIVAL SECTION START **************************/}
      <h1 className="my-10 text-5xl font-bold text-center">New Arrivals</h1>
      <div className="carousel carousel-center space-x-10 p-10 bg-stone-900 w-full">
        {landingCall.newArrival.map((newArr) => {
          return (
            <React.Fragment key={newArr.id}>
              <div className="card w-96 bg-base-100 shadow-xl carousel-item">
                <figure className="max-h-80">
                  <img src={newArr.image_url} alt={newArr.name} />
                </figure>
                <div className="card-body bg-slate-900">
                  <h2 className="card-title">{newArr.name}</h2>
                  <div className="card-actions justify-start my-1">
                    <div className="badge badge-primary">
                      {getManufacturerName(
                        landingCall.manufacturer,
                        newArr.manufacturer_id
                      )}
                    </div>
                    <div className="badge badge-outline">35mm Camera</div>
                  </div>
                  <p className="prose overflow-y-hidden max-h-28">
                    {newArr.description}
                  </p>
                  <div className="card-actions justify-end mt-2">
                    <p className="justify-start text-2xl">
                      ${newArr.cost / 100}
                    </p>
                    <Link
                      to="/checkout"
                      className="btn btn-secondary hover:shadow-xl hover:shadow-cyan-500/50 transition hover:ease-in-out duration-500 hover:scale-110 hover:translate-y-1"
                    >
                      Add to cart
                    </Link>
                  </div>
                </div>
              </div>
              {/************************ NEW ARRIVAL SECTION END  ***************************/}
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  ) : (
    <Loader />
  );
}
