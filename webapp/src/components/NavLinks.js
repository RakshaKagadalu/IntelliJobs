import { NavLink } from "react-router-dom";
import links from "../utilities/links";

//setting up links for small side bar when the
const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map((item) => {
        const { text, path, id, icon } = item;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
