import { useContextApp } from "../context/contextApp";
import { Navigate } from "react-router-dom";

//adding protected route to restrict the user to access the application after logging out
const ProtectedRoute = ({ children }) => {
  const { user } = useContextApp();
  if (!user) {
    return <Navigate to="/FrontPage" />;
  }
  //if the user has not logged out and trying to access other pages, we return the sharedlayout
  return children;
};

export default ProtectedRoute;
