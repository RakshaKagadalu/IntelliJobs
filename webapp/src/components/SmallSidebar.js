import "../sass/smallSidebar.scss";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { useContextApp } from "../context/contextApp";
import NavLinks from "./NavLinks";

//setting up the small side bar for making the screen responsive when the size of the screen is reduced
const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useContextApp();
  return (
    <h4>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </h4>
  );
};

export default SmallSidebar;
