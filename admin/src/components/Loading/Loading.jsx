import React from "react";
import "./Loading.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <div className="loading-screen">
      <div className="loader-holder">
        <DotLottieReact
          src="https://lottie.host/2609cd5a-e342-482b-b4cd-c0b349e8c1e4/4vPbmC2dt8.json"
          loop
          autoplay
        />
      </div>
      <p>Loading Admin Panel</p>
    </div>
  );
};

export default Loading;
