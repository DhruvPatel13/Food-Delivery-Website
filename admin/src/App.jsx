import React, { useState, useEffect, useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Offers from "./components/Offers/Offers";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Loading from "./components/Loading/Loading";
import { Route, Routes } from "react-router-dom";
import { Context } from "./context/Context";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { loading } = useContext(Context);
  useEffect(() => {
    if (showLogin) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showLogin]);

  if (loading) return <Loading />;
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className={`${showLogin ? "blur" : ""}`}>
        <Navbar setShowLogin={setShowLogin} />
        <hr />
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/offers" element={<Offers />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
