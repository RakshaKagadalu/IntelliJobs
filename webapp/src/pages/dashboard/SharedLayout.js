import { Outlet, Link } from "react-router-dom";
import "../../sass/SharedLayou.scss";
//setting up nav bar and giving stucture to the nested pages
import { Navbar, BigSidebar, SmallSidebar } from "../../components";

//setting up big side bar for full screen , small side bar for smaller screens and nav bar to navigate to diff pages
const SharedLayout = () => {
  return (
    <main className="dashboard">
      <SmallSidebar></SmallSidebar>
      <BigSidebar></BigSidebar>
      <div>
        <Navbar></Navbar>
        <div className="dashboard-page">
          <Outlet></Outlet>
        </div>
      </div>
    </main>
  );
};

export default SharedLayout;
