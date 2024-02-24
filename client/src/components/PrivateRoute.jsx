import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Outlet component displays the children component
// Navigate (component) and useNavigate (hook)
export const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return <>{currentUser ? <Outlet /> : <Navigate to="/sign-in" />}</>;
};
