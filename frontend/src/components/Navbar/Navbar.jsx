import React from "react";
import "./Navbar.css";
import { useState, useContext, useRef } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import nav_dropdown from "../../assets/nav_dropdown.png";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [input, setInput] = useState("");
  const [displayList, setDisplayList] = useState([]);
  const { getTotalCartAmount, token, setToken, food_list } =
    useContext(StoreContext);

  const menuRef = useRef();
  const inputRef = useRef();
  const location = useLocation();
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("navbar-menu-visible");
    e.target.classList.toggle("open");
    inputRef.current.parentElement.classList.toggle("noShadow");
  };
  function findMatches(wordToMatch, foodList) {
    return foodList.filter((food) => {
      const regx = new RegExp(wordToMatch, "gi");
      return food.name.match(regx) || food.category.match(regx);
    });
  }

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  const changeHandler = (e) => {
    setInput(e.target.value.toLowerCase());
    setDisplayList(findMatches(e.target.value, food_list).slice(0, 5));
  };
  const handleSubmit = (e, inputVal) => {
    e.preventDefault();
    const match = findMatches(inputVal.toLowerCase(), food_list);
    const findItem = match.filter((e) =>
      e.name.toLowerCase().includes(inputVal)
    );
    try {
      const itemId = findItem.length > 0 ? findItem[0]._id : 0;
      if (itemId != 0) {
        const targetElement = document.getElementById(itemId);
        console.log(targetElement);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "end" });
          targetElement.classList.add("highlight");
          setTimeout(() => {
            targetElement.classList.remove("highlight");
          }, 1500);
        }
      } else {
        toast.error("No such item available");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
      />
      <ul ref={menuRef} className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact us
        </a>
      </ul>
      <div className="navbar-r">
        {location.pathname === "/" && (
          <form onSubmit={(e) => handleSubmit(e, input)}>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search food.."
                onChange={(e) => changeHandler(e)}
                ref={inputRef}
                value={input}
                onBlur={() => setTimeout(() => setInput(""), 600)}
              />
              <div className="search-logo">
                <img
                  src={assets.search_icon}
                  onClick={(e) => handleSubmit(e, input)}
                />
              </div>
              {input && displayList.length > 0 ? (
                <ul className="input-ul">
                  {displayList.map((el, i) => (
                    <li
                      key={i}
                      className="input-li"
                      value={el.name}
                      onClick={(e) => handleSubmit(e, el.name.toLowerCase())}
                    >
                      {el.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <></>
              )}
            </div>
          </form>
        )}
        <div className="navbar-right">
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
