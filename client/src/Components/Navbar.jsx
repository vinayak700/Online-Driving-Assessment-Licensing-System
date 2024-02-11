import React, { useState } from "react";
import "../Styles/Navbar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { userActions, userSelector } from "../Redux/Reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(userSelector) || null;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      {user && (
        <>
          <nav className="navbar">
            <div className="navbar-left">
              <Link to="/" className="navbar-brand">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMeFkBUAeaoB96PR0uc4Daq2kKPTsa0NtHO0wocT8hFF38NojGe-zDnV4g0OpbMXDZUwU&usqp=CAU"
                  alt="Logo"
                  className="logo"
                />
                <span className="brand-name">Road Certify</span>
              </Link>
            </div>
            <div className="navbar-right">
              <Link to="/" className="navbar-item">
                {user.name}
              </Link>
              <div className="dropdown">
                <button className="profile-icon" onClick={toggleDropdown}>
                  <img
                    src={`http://localhost:8080/${user.picturePath}`}
                    alt="profile"
                    height={40}
                  />
                </button>
                {dropdownOpen && (
                  <div className="dropdown-content">
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        dispatch(userActions.logout());
                        navigate("/signin");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>
          <Outlet />
        </>
      )}
    </>
  );
};

export default Navbar;
