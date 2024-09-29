import React, {  useContext } from "react";
import "./List.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../../context/Context";

const List = () => {
  const { token, url, foodList } = useContext(Context);

  const removeFood = async (foodId) => {
    if (!token) return toast.error("Login To Make Changes!");
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("error");
    }
  };
  return (
    <div className="list flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <strong>Image</strong>
          <strong>Name</strong>
          <strong>Category</strong>
          <strong>Price</strong>
          <strong>Action</strong>
        </div>
        {foodList.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
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

export default List;
