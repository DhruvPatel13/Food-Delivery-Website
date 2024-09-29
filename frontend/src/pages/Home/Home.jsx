import React from "react";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import { useState } from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import WeeklyDeals from "../../components/WeeklyDeals/WeeklyDeals";
import Carousel from "../../components/Carousel/Carousel";


const Home = () => {
  const [category, setCategory] = useState("All");
  return (
  
    <div>
      <Carousel />
      <WeeklyDeals/>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload/>
    </div>
  );
};

export default Home;
