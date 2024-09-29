import React, { useContext } from "react";
import "./Deals.css";
import { assets } from "../../assets/assets";
import Tilt from "react-parallax-tilt";
import { StoreContext } from "../../context/StoreContext";

const Deals = ({ id, name, old_price, new_price, description, image }) => {

  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  return (
    <div className="todays-special">
      <Tilt>
        <div className="card">
          <div className="card-image">
            <img src={url + "/images/" + image} alt="" />
          </div>
          <div className="cart-controls">
            {!cartItems[id] ? (
              <img
                className="add"
                onClick={() => {addToCart(id), console.log("dd");
                }}
                src={assets.add_icon_white}
                alt=""
              />
            ) : (
              <div className="cart-plus-minus">
                <img
                  onClick={() => removeFromCart(id)}
                  src={assets.remove_icon_red}
                  alt=""
                />
                <p>{cartItems[id]}</p>
                <img
                  onClick={() => addToCart(id)}
                  src={assets.add_icon_green}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="card-info">
            <h3>{name}</h3>
            <p className="card-desc">
              {description} Lorem ipsum dolor sit amet.
            </p>
            <div className="price">
              <p className="old">${old_price}</p>
              <p className="new">${new_price}</p>
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default Deals;
