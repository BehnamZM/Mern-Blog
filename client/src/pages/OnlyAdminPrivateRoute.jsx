import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function OnlyAdminPrivateRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.isAdmin ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
}
