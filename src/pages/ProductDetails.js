import React, { useState, useEffect, useContext } from "react";
import Loader from "../components/Loader";
import { baseUrl, apiPath } from "../utils/axios";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function ProductDetails() {
  const { camera_id } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    let fetchData = async () => {
      setIsLoading(true);
      const fetchDetails = await baseUrl.get(
        `${apiPath.viewProduct}${camera_id}`
      );
      setProductDetail(fetchDetails.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return !isLoading ? (
    <React.Fragment>
      <div className="container mx-auto">
        {productDetail ? (
          <main className="flex flex-col w-full lg:flex-row">
            <section className="grid flex-grow h-screen card bg-base-200 rounded-box place-items-center shadow-xl shadow-orange-500">
              <img src={productDetail.image_url} alt={productDetail.name} />
            </section>
            <div className="divider lg:divider-horizontal"></div>
            <section className="grid flex-grow h-screen card bg-base-200 rounded-box place-items-start shadow-xl sm:pt-20 shadow-purple-500 font-mono">
              <div className="sm:pl-8">
                <h2 className="text-4xl pl-3 font-semibold">
                  {productDetail.name}
                </h2>
                <p className="text-2xl pl-4 pt-1">
                  {productDetail.type ? productDetail.type.name : null}
                </p>
                <p className="text-2xl pl-4 pt-1">
                  {productDetail.manufacturer
                    ? productDetail.manufacturer.name
                    : null}
                </p>
                <p className="pl-4 pt-1 font-semibold text-xl">
                  SGD {productDetail.cost / 100}
                </p>
                <div>
                  {productDetail.classification
                    ? productDetail.classification.map((e) => (
                        <div key={e.id} className="badge badge-outline badge-primary ml-4 mt-2">
                          {e.name}
                        </div>
                      ))
                    : null}
                </div>
                <div>
                  {productDetail.film
                    ? productDetail.film.map((e) => (
                        <div key={e.id} className="badge badge-outline badge-accent ml-4 mt-2">
                          {e.name}
                        </div>
                      ))
                    : null}
                </div>
                <h1 className="ml-4 font-semibold text-lg pt-2">Description</h1>
                <div className="border/75 rounded-box sm:w-96 max-h-60 overflow-y-scroll px-2 mt-2 sm:ml-2 shadow-md shadow-purple-500/80">
                  <p className="py-2 px-2">{productDetail.description}</p>
                </div>
                <h1 className="ml-4 font-semibold text-lg pt-6">Specifications</h1>
                <div className="border/75 sm:ml-2 border-cyan-500/50 sm:h-60 h-72 rounded-box shadow-md shadow-purple-500/80 mt-4">
                  <div className="sm:px-4 sm:pt-6 px-4 pt-2">
                    {productDetail.camera_iso ? (
                      <p>ISO: {productDetail.camera_iso}</p>
                    ) : null}
                    {productDetail.shutter_speed ? (
                      <p>Shutter Speed: {productDetail.shutter_speed}</p>
                    ) : null}
                    {productDetail.aperture ? (
                      <p>Aperture: {productDetail.aperture}</p>
                    ) : null}
                    {productDetail.focal_length ? (
                      <p>Focal Length: {productDetail.focal_length}</p>
                    ) : null}
                    {productDetail.format ? (
                      <p>Format: {productDetail.format}</p>
                    ) : null}
                    {productDetail.flash ? (
                      <p>Flash: {productDetail.flash}</p>
                    ) : null}
                    {productDetail.battery ? (
                      <p>Battery: {productDetail.battery}</p>
                    ) : null}
                    {productDetail.weight ? (
                      <p>Weight: {productDetail.weight}g</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          </main>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  ) : (
    <Loader />
  );
}
