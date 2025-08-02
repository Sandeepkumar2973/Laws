import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../contextApi/AuthContext";
import { Box, Flex, Button, Spacer, Link } from "@chakra-ui/react";

const DashHeader = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser?.user?.role === "user" && (
        <Button as={RouterLink} to="/user-dashboard" mx={2} colorScheme="teal">
           Dashboard
        </Button>
      )}

      {currentUser?.user?.role === "mootUser" && (
        <Button
          as={RouterLink}
          to="/Moot-user-dashboard"
          mx={2}
          colorScheme="purple"
        >
           Dashboard
        </Button>
      )}

      {currentUser?.user?.role === "admin" && (
        <Button as={RouterLink} to="/admin-dashboard" mx={2} colorScheme="red">
          Dashboard
        </Button>
      )}      
    </>
  );
};

export default DashHeader;
