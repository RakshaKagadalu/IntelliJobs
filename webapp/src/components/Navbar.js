import "../sass/navBar.scss";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useContextApp } from "../context/contextApp";
//import Logo from "./Logo"

//using react icons in nav bar next to the navigation links
import { useState } from "react";
const Navbar = () => {
  //toggling small side bar for smaller screens
  const [showLogout, setShowLogout] = useState(false);

  const { toggleSidebar, logoutUser, user } = useContextApp();
  return (
    <div className="navCom">
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft></FaAlignLeft>
        </button>
        <div>
          <h3 className="logo-text">Track Your Job Applications</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle></FaUserCircle>
            {user?.name}
            <FaCaretDown></FaCaretDown>
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
