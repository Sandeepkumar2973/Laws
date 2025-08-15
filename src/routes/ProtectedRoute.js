// src/routes/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Spinner, Center } from "@chakra-ui/react";
import { AuthContext } from "../Components/contextApi/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  console.log(currentUser, "currentUser");
  if (
    allowedRoles &&
    !allowedRoles.includes(currentUser?.user?.role || currentUser?.data?.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
