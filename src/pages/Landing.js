import React from "react";
import Hero from "../images/hero-image.jpg"

export default function Landing() {
  return (
    <React.Fragment>
        <div
          class="hero min-h-screen"
          style={{backgroundImage: `url(${Hero})`}}
        >
          <div class="hero-overlay bg-opacity-40"></div>
          <div class="hero-content text-center text-neutral-content">
            <div class="max-w-md">
              <h1 class="mb-5 text-5xl font-bold">C A N O N - A E 1</h1>
              <p class="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button class="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
    </React.Fragment>
  );
}
