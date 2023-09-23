import { useLocation, Navigate, Outlet } from "react-router-dom";
import userAuth from "../../hooks/userAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles } = userAuth();

  return (
    <>
      {allowedRoles.includes(roles) ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
