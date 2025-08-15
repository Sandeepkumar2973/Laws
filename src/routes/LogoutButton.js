import {
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/contextApi/AuthContext";

const LogoutButton = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("MootUserInfo");
    localStorage.removeItem("lawvsadmininfo");
    localStorage.removeItem("userinfo");
    setCurrentUser(null);
    onClose(); // close the dialog
    navigate("/");
  };

  return (
    <>
      <Button
        mt={4}
        bg="red.500"
        color="white"
        px={4}
        py={2}
        borderRadius="md"
        onClick={onOpen}
        _hover={{ bg: "red.600" }}
      >
        Logout
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Logout
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you want to logout?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleLogout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default LogoutButton;
