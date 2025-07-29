import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Components/contextApi/AuthContext";

const LogoutButton = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("MootUserInfo");
    localStorage.removeItem("admininfo");
    localStorage.removeItem("userinfo");
    setCurrentUser(null); // ✅ Clear the auth context
    navigate("/"); // ✅ Redirect to Home
  };

  return (
    <ChakraLink
      as="button"
      mt={4}
      bg="red.500"
      color="white"
      px={4}
      py={2}
      borderRadius="md"
      onClick={handleLogout}
    >
      Logout
    </ChakraLink>
  );
};

export default LogoutButton;
