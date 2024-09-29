import React, { useState, useEffect, useContext } from "react";
import "./ListOffers.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../../context/Context";

const ListOffers = () => {
  const { token, url } = useContext(Context);
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/offerlist`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  const removeFood = async (foodId) => {
    if (!token) return toast.error("Login To Make Changes!");
    const response = await axios.post(`${url}/api/food/removeoffer`, {
      id: foodId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("error");
    }
  };
  return (
    <div className="list-offers flex-col">
      <p>All Offer List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <strong>Image</strong>
          <strong>Name</strong>
          <strong>Old Price</strong>
          <strong>New Price</strong>
          <strong>Action</strong>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p className="list-name">{item.name}</p>
              <p>{item.old_price}</p>
              <p>{item.new_price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListOffers;
