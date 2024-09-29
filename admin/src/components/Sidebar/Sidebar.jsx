import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.list_icon} alt="" />
          <p>Items List</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>User Orders</p>
        </NavLink>
        <NavLink to="/offers" className="sidebar-option">
          <img src={assets.offers_icon} className="img" alt="" />
          <p className="p">Special Offers</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
