import React, { useState, useEffect, useContext } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { token , url} = useContext(Context);
  
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      const fetchedOrders = response.data.data;
      setOrders(fetchedOrders);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (evt, orderId) => {
    if (!token) return toast.error("Login To Make Changes!");
    const newStatus = evt.target.value;
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: newStatus,
    });
    if (response.data.success) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
    )
  );
  await fetchAllOrders();
}
};

const orderPermission = async (val = null, orderId) => {
    if (!token) return toast.error("Login To Make Changes!");
    const response = await axios.post(url + "/api/order/orderpermission", {
      orderId,
      orderAccept: val,
    });
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, orderAccept: val } : order
      )
    );
    if (response.data.success) {
      await fetchAllOrders();
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div
            key={index}
            className={`order-item 
              ${order.status === "Delivered" ? "delivered" : ""}
               ${String(order.orderAccept) === "false" ? "reject" : ""}`}
            id={`${order._id}`}
          >
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstname + " " + order.address.lastname}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>Price: ${order.amount}</p>
            {String(order.orderAccept) === "null" ? (
              <div className="order-permission">
                <div className="btn">
                  <button onClick={() => orderPermission("true", order._id)}>
                    Accept
                  </button>
                  <button
                    onClick={() => orderPermission("false", order._id)}
                    className="red"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
            {String(order.orderAccept) === "true" ? (
              <div>
                <select
                  className={`${order.status === "Delivered" ? "grey" : ""}`}
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  disabled={order.status === "Delivered"}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ) : (
              <></>
            )}
            {String(order.orderAccept) === "false" ? (
              <div>Order Rejected</div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
