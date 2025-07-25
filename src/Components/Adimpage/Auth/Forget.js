import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import bookImage from "../Assets/book.jpg";
// import "./Auth.css";
import * as mod from "./../../../url";

const AdminAuthForget = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => setShow(!show);

  const generateOTP = async () => {
    setLoading(true);
    try {
      await axios.post(`${mod.api_url}/api/auth/admin/generate-otp`, {
        email,
      });
      toast({
        title: "OTP sent to your email!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setDisabled(true);
      onOpen();
    } catch (error) {
      toast({
        title: "Error occurred.",
        description: error.response?.data?.message || "Failed to generate OTP!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    try {
      await axios.post(`${mod.api_url}/api/auth/admin/forgot-password`, {
        email,
        otp,
        newPassword: password,
      });
      toast({
        title: "Password updated successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error occurred.",
        description:
          error.response?.data?.message || "Failed to update password!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        // backgroundImage={`url(${bookImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Container
          width="300px"
          border="1px solid #e7e7e7"
          padding="10px"
          borderRadius="10px"
        >
          <Container
            border="1px solid #e7e7e7"
            padding="10px"
            borderRadius="30px"
          >
             ADMIN PORTAl
          </Container>
          <Text fontSize="x-large" fontWeight="700">
            Admin Forget Password
          </Text>
          <FormControl id="email" isRequired>
            <FormLabel>Enter Your Email</FormLabel>
            <Input
              placeholder="Enter Your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormControl>

          <Button
            width="100%"
            marginTop={3}
            colorScheme="blue"
            onClick={generateOTP}
            disabled={disabled}
            isLoading={loading}
          >
            {disabled ? "OTP Generated" : "Generate OTP"}
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign="center">Verify with OTP</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl id="otp" isRequired>
                  <FormLabel>Enter OTP</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="Enter Your OTP"
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                      width="100%"
                      marginRight={2}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>New Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Enter Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="red" width="50%" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  width="50%"
                  onClick={submitHandler}
                  isLoading={loading}
                >
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Box width="100%">
            <Button
              colorScheme="green"
              width="100%"
              style={{ marginTop: 15 }}
              marginRight={2}
              as={Link}
              to="/"
            >
              Login
            </Button>
          </Box>
        </Container>
      </Flex>
    </>
  );
};

export default AdminAuthForget;
