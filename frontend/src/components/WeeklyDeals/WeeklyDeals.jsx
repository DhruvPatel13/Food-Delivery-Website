import React from "react";
import "./WeeklyDeals.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import Deals from "../Deals/Deals";

const WeeklyDeals = () => {
  const { weekly_list } = useContext(StoreContext);

  return (
      <div className="weekly-deals" id="weekly-deals">
        <h1>Special Weekly Deals</h1>
        <p className="weekly-deals-text">
          Grab the best offers of this week before they're gone!
        </p>
        <div className="weekly-deals-list">
          {weekly_list.map((item, index) => {
            return (
              <Deals
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                old_price={item.old_price}
                new_price={item.new_price}
                image={item.image}
              />
            );
          })}
        </div>
        <hr />
      </div>
  );
};

export default WeeklyDeals;
