import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const AuthOnly = ({ children }: { children: React.ReactNode }) => {
  const { me } = useAuth();
  if (!me) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default AuthOnly;
