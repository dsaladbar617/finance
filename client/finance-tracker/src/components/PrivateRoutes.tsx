import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

// Creates a route that is only accessible if the user is authenticated. If user is not authenticated it will navigate to the login page. Tracked using the AuthContext.
const PrivateRoutes = () => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
