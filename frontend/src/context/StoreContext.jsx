import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState({});

  const url = "https://food-delivery-backend-y4ey.onrender.com";
  
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);
  const [weekly_list, setWeekly_list] = useState([]);
  const [allFoodList, setAllFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allFoodList.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount +=
            (itemInfo.price || itemInfo.new_price) * cartItems[item];
        }
      }
    }
    return totalAmount;
  };
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFood_list(response.data.data);
  };
  const fetchWeeklyDeals = async () => {
    const response = await axios.get(url + "/api/food/offerlist");
    setWeekly_list(response.data.data);
  };
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      await fetchWeeklyDeals();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
      setLoading(false);
    }
    loadData();
  }, []);
  useEffect(() => {
    if (food_list.length > 0 || weekly_list.length > 0) {
      setAllFoodList([...food_list, ...weekly_list]);
    }
  }, [food_list, weekly_list]);

  const contextValue = {
    food_list,
    weekly_list,
    allFoodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    fetchFoodList,
    url,
    token,
    setToken,
    loading,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
