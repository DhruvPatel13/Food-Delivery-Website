import React, { useState, useEffect } from "react";
import "./Carousel.css";
import { carouselData } from "../../assets/assets";

const Carousel = () => {
  const [currentState, setCurrentState] = useState(0);

  const goToSlide = (index) => {
    setCurrentState(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentState((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container-style">
      <div
        className="carousel-content"
        style={{ transform: `translateX(-${currentState * 100}%)` }}
      >
        {carouselData.map((item, idx) => (
          <div key={idx} className="carousel-slide">
            <div
              className="image-holder"
              style={{ backgroundImage: `url(${item.url})` }}
            ></div>
            <div className="description">
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <div>
                <button className="btn">
                  <a href={item.href}>{item.btnText}</a>
                </button>
                <div className="carousel-boullt">
                  {carouselData.map((_, idx) => (
                    <span
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`${currentState === idx ? "white" : ""}`}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
