import React from "react";
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const GuestOnly = ({ children }: { children: React.ReactNode }) => {
  const { me } = useAuth();

  if (me) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default GuestOnly;
