import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
import "./navbar.css";
import { useSelector,useDispatch } from "react-redux";
import { removeToken } from "../../../store/authSlice";
import axios from "axios";

const Navbar = () => {
  const token = useSelector((store) => store.auth.user);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  console.log(token)

  if (token){
    var options = {
        headers: {
          Authorization: `Token ${token.token}`,
        },
      };
  }
  const handleLogout = () => {
    axios.post("http://127.0.0.1:8000/api/logout",{}, options)
        .then((response) => {
          dispatch(removeToken())
          navigate('/login')
          console.log(response)})
        .catch((error) => console.log(error));
    };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#0f172d" }}
      >
        <NavLink className="navbar-brand font-weight-bold" to="/movie-list">
          OTT Platform
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto ">
            <li className="nav-item">
              <NavLink id="navbarHome" className="nav-link" to="/movie-list">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                View List
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink className="dropdown-item" to={"/watch-list"}>
                  My List
                </NavLink>
                <NavLink className="dropdown-item" to={"/watch-history"}>
                  Watch history
                </NavLink>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Subscriptions
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink className="dropdown-item" to={"/subscription-status"}>
                  Current Subscriptions
                </NavLink>
                <NavLink className="dropdown-item" to={"/subscription-plans"}>
                  Get subscriptions
                </NavLink>
              </div>
            </li>
            {/* <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to={"/signup"}
              >
                Signup
              </NavLink>
            </li> */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Account
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink className="dropdown-item" to={"/Change-password"}>
                  Change Password
                </NavLink>
                <NavLink className="dropdown-item active"  onClick={handleLogout}>
                  Logout
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
