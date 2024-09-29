import { createContext, useState, useEffect } from "react";
import axios from "axios"
export const Context = createContext(null);

const ContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  // const url = "http://localhost:4000";
  const url = "http://192.168.4.101:4000";


  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setFoodList(response.data.data);
      setLoading(false);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);


  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);

  const contextValue = {
    url,
    token,
    setToken,
    loading,
    foodList
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
