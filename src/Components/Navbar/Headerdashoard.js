import React, { useContext } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import { Box, Flex, Button, Spacer, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
const pulseAnimation = keyframes`
  0% { transform: scale(1); background-color: #d11887ff; }
  50% { transform: scale(1.12); background-color: #0fc5b6ff; }
  100% { transform: scale(1); background-color: #395ce8ff; }
`;
const DashHeader = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser, "currentUser");

  return (
    <>
      {/* {currentUser?.user?.role === "user" && (
        <Button as={RouterLink} to="/user-dashboard" mx={2} colorScheme="teal">
           Dashboard
        </Button>
      )} */}

      {currentUser?.user?.role === "mootUser" ? (
        <Button
          as={RouterLink}
          to="/Moot-user-dashboard"
          mx={2}
          colorScheme="purple"
        >
          Dashboard
        </Button>
      ) : (
        <ChakraLink
          as={RouterLink}
          to="/moot-user-signup"
          textDecoration="none"
          textAlign="center"
          color="white"
          fontWeight="bold"
          borderRadius="full"
          padding={2}
          px={6}
          display="inline-block"
          animation={`${pulseAnimation} 2s ease-in-out infinite`} // 👈 continuous animation
          _hover={{
            textDecoration: "none",
            transform: "scale(1.08)",
            boxShadow: "0 0 20px rgba(206, 67, 238, 0.49)",
            bg: "#20ebebffff",
            _before: {
              left: "100%", // shine animation
            },
          }}
        >
          Moot Court Signup
        </ChakraLink>
      )}

      {/* {currentUser?.user?.role === "admin" && (
        <Button as={RouterLink} to="/admin-dashboard" mx={2} colorScheme="red">
          Dashboard
        </Button>
      )}       */}
    </>
  );
};

export default DashHeader;
