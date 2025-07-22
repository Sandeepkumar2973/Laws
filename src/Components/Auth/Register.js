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
  ModalFooter,
  Text,
  useDisclosure,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as mod from "./../../url";
import bookImage from "../Assets/book.jpg";
import "./Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Check if all fields are filled
    if (name && email && mobile && password) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [name, email, mobile, password]);

  const handleClick = () => setShow(!show);

  const generateOTP = async () => {
    if (!email || !mobile) {
      toast({
        title: "Error",
        description: "Email and Mobile are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `${mod.api_url}/api/auth/admin/generate-otp`,
        { mobile, email, mode: "new admin" }
      );
      toast({
        title: "OTP Sent",
        description: "Check your email or mobile for the OTP.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onOpen();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Error generating OTP",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const submitHandler = async () => {
    try {
      const { data } = await axios.post(
        `${mod.api_url}/api/auth/admin/register/admin`,
        {
          name,
          email,
          mobile,
          password,
          otp,
        }
      );
      toast({
        title: "Registration Successful",
        description: "You have successfully registered. Please log in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
      onClose();
      setEmail("");
      setMobile("");
      setName("");
      setPassword("");
      setOtp("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Registration failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        backgroundImage={`url(${bookImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Container width="400px" border="1px solid #e7e7e7" padding="10px">
          <Container
            border="1px solid #e7e7e7"
            padding="10px"
            borderRadius="30px"
          >
            LMS Portal
          </Container>
          <Text fontSize="xx-large" fontWeight="700">
            Register
          </Text>
          <VStack spacing="5px" color="black">
            <Flex>
              <FormControl id="first-name" isRequired mr="4">
                <FormLabel>Admin Name</FormLabel>
                <Input
                  placeholder="First Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </FormControl>
              <FormControl id="mobile" isRequired mr="4">
                <FormLabel>Mobile</FormLabel>
                <Input
                  placeholder="Mobile"
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                />
              </FormControl>
            </Flex>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Enter Your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FormControl>
            <Flex>
              <FormControl id="password" isRequired mr="4">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Box>
                <FormLabel fontSize="x-small"> OTP</FormLabel>
                <Button
                  colorScheme="blue"
                  width="100%"
                  onClick={generateOTP}
                  isDisabled={!isFormValid}
                >
                  OTP
                </Button>
              </Box>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader textAlign="center">Verify with OTP</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl id="otp" isRequired>
                    <FormLabel>Enter OTP</FormLabel>
                    <Input
                      placeholder="Enter Your OTP"
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                      width="100%"
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="red"
                    width="50%"
                    mr={3}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    width="100%"
                    onClick={submitHandler}
                  >
                    Register
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </VStack>
          <Box width="100%">
            <Button
              colorScheme="green"
              width="46%"
              style={{ marginTop: 15 }}
              marginRight={2}
              as={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              colorScheme="red"
              width="46%"
              style={{ marginTop: 15 }}
              as={Link}
              to="/forget"
            >
              Forget
            </Button>
          </Box>
        </Container>
      </Flex>
    </>
  );
};

export default Register;
