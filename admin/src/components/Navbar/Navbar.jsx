import React, { useContext, useRef } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const { token, setToken } = useContext(Context);
  const navigate = useNavigate();
  const ulRef = useRef();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/add");
  };

  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <h2>Admin Panel</h2>
      {!token ? (
        <div className="login-content" onClick={() => setShowLogin(true)}>
          <span>Login</span>
          <img src={assets.login_icon} />
        </div>
      ) : (
        <div className="profile">
          <img
            src={assets.profile_image}
            onClick={() => ulRef.current.classList.toggle("visible")}
          />
          <ul className="dropdown" ref={ulRef}>
            <li onClick={logout}>
              <img src={assets.logout_icon} /> Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
