import React from "react";
import { Triangle } from "react-loader-spinner";

export default function Loader() {
  return (
    <React.Fragment>
      <section className="h-screen m-10 lg:pt-10">
        <div className="flex justify-center items-center h-4/6">
          <Triangle color="#ffb433" width={150} height={150} />
        </div>
      </section>
    </React.Fragment>
  );
}
