import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" width="100%" backgroundColor="gray.200">
          Login As
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} pb={6}>
            <Button
              width="100%"
              colorScheme="blue"
              onClick={() => {
                onClose();
                navigate("/user-auth-login");
              }}
            >
              User Login
            </Button>
            <Button
              width="100%"
              colorScheme="purple"
              onClick={() => {
                onClose();
                navigate("/moot-user-login");
              }}
            >
              Moot User Login
            </Button>
            <Button
              width="100%"
              colorScheme="red"
              onClick={() => {
                onClose();
                navigate("/admin-auth-login");
              }}
            >
              Job/Internship Post
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
