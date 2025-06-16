
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/useUser";
import { JSX } from "react";

type AuthRouteProps = {
  requireAuth: boolean; 
  redirectTo: string;
  element: JSX.Element;
};

export default function AuthRoute({
  requireAuth,
  redirectTo,
  element,
}: AuthRouteProps) {
  const { isLogged, finishedAuthenticating } = useUser();

  if (!finishedAuthenticating) return null;

  if (requireAuth && !isLogged) return <Navigate to={redirectTo} replace />;
  if (!requireAuth && isLogged) return <Navigate to={redirectTo} replace />;

  return element;
}
