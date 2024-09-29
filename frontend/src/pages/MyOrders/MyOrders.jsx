import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [dots, setDots] = useState(1);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots % 3) + 1); 
    }, 500); 
    return () => clearInterval(interval); 
  }, []);
  const classHandler = (param = "", accept = "null") => {
    if (accept === "true") {
      if (param === "Food processing") {
        return "food";
      } else if (param === "Out for delivery") {
        return "out";
      } else if (param === "Delivered") {
        return "del";
      }
    } else if (accept === "false") {
      return "reject";
    } else {
      return;
    }
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div
              key={index}
              className={`my-orders-order ${classHandler(
                order.status,
                order.orderAccept
              )}`}
            >
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <span>Items: {order.items.length}</span>
              <p>
                <span>&#9679;</span>
                {String(order.orderAccept) === "null" ? (
                  <b>Awaiting for Approval{".".repeat(dots)}</b>
                ) : (
                  <></>
                )}
                {String(order.orderAccept) === "true" ? (
                  <b>{order.status}</b>
                ) : (
                  <></>
                )}
                {String(order.orderAccept) === "false" ? (
                  <b>Order Rejected</b>
                ) : (
                  <></>
                )}
              </p>
              <button onClick={fetchOrders}>Track</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
