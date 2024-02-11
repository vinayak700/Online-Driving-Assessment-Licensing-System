import React from "react";
import "../Styles/Sidebar.css";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link className="tab" to={"/profile"} style={{ textDecoration: "none" }}>
        Profile
      </Link>
      <Link className="tab" to={"/profile"} style={{ textDecoration: "none" }}>
        Settings
      </Link>
      <Link className="tab" to={"/profile"} style={{ textDecoration: "none" }}>
        Messages
      </Link>
      <Outlet />
    </div>
  );
};

export default Sidebar;
