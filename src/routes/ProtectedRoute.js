// src/routes/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Components/contextApi/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser?.user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
