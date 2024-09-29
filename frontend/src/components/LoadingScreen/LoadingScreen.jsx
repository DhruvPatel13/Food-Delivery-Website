import React from "react";
import "./LoadingScreen.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loader-holder">
        <DotLottieReact
          src="https://lottie.host/e507f6b1-afe9-4bb9-9ae8-5471c62585a4/AqU0uyWvvM.json"
          loop
          autoplay
        />
      </div>
      <p>Loading Website</p>
    </div>
  );
};

export default LoadingScreen;
