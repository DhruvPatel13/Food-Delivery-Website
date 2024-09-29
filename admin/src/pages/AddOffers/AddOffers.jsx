import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddOffers.css";
import { Context } from "../../context/Context";

const AddOffers = () => {
  const [image, setImage] = useState(false);
  const { token, url } = useContext(Context);
  const [data, setData] = useState({
    name: "",
    description: "",
    old_price: "",
    new_price: "",
    specialOffer: true,
  });
  const onChangeHandler = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (evt) => {
    evt.preventDefault();
    if (!token) return toast.error("Login To Make Changes!");
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("old_price", Number(data.old_price));
    formData.append("new_price", Number(data.new_price));
    formData.append("specialOffer", data.specialOffer);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/addoffer`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        specialOffer: true,
        old_price: "",
        new_price: "",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
            />
          </label>
        </div>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows={6}
            placeholder="write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-price flex-col">
            <p>Product old price</p>
            <input
              onChange={onChangeHandler}
              value={data.old_price}
              type="number"
              name="old_price"
              placeholder="$0"
            />
          </div>
          <div className="add-price flex-col">
            <p>Product new price</p>
            <input
              onChange={onChangeHandler}
              value={data.new_price}
              type="number"
              name="new_price"
              placeholder="$0"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddOffers;
