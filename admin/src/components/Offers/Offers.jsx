import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./Offers.css";
import AddOffers from "../../pages/AddOffers/AddOffers";
import ListOffers from "../../pages/ListOffers/ListOffers";

const Offers = ({ url }) => {
  const [checkActive, setCheckActive] = useState("");
  useEffect(() => {
    console.log(checkActive);
  }, [checkActive]);

  return (
    <div className="offers">
      <div className="offers-controls">
        <div
          to="/offers/addoffer"
          className={`offer-options ${checkActive === "add" ? "active" : ""}`}
          onClick={() => setCheckActive("add")}
        >
          <img src={assets.add_icon} alt="" />
          <p>Add Offers</p>
        </div>
        <div
          to="/offers/offerlist"
          className={`offer-options ${checkActive === "list" ? "active" : ""}`}
          onClick={() => setCheckActive("list")}
        >
          <img src={assets.list_icon} alt="" />
          <p>List Of Offers</p>
        </div>
      </div>
      <div className="offers-content">
        {checkActive === "add" ? <AddOffers url={url} /> : <></>}
        {checkActive === "list" ? <ListOffers url={url} /> : <></>}
      </div>
    </div>
  );
};

export default Offers;
