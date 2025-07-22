import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
  useBreakpointValue,
  Image,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as mod from "./../../url";
import logo from "../Assets/logo/198cd4a6-9bef-4b76-89b2-03c80467d2ba.png";
import logo1 from "../Assets/logo/bgg.jpg"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const isDesktop = useBreakpointValue({ base: false, md: true });

  const handleClick = () => setShow(!show);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${mod.api_url}/api/v1/admin/login-admin`, {
        email,
        password,
      });

      if (data.data) {
        toast({
          title: "Login successful!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        sessionStorage.setItem("AdminjobInfo", JSON.stringify(data));
        navigate("/");
        window.location.reload();
        setEmail("");
        setPassword("");
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      toast({
        title: "Error occurred.",
        description: error.response?.data?.message || "Something went wrong!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box position="relative" w="100vw" h="100vh" overflow="hidden">
      {isDesktop && (
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          backgroundImage={logo1}
          backgroundSize="cover"
          backgroundPosition="center"
          zIndex={1}
        />
      )}

      <Flex
        direction={{ base: "column", md: "row" }}
        zIndex={2}
        position="relative"
        h="100%"
        p={{ base: 4, md: 10 }}
        justify="space-between"
        align="center"
      >
        {isDesktop && (
          <Box color="white" p={6} maxW="50%">
            <Image
              src={logo}
              alt="Logo"
              maxW="300px"
              mb={6}
            />
            <Box color="#2D3748"> {/* Dark gray text for good readability */}
              <Text fontSize="3xl" fontWeight="extrabold" color="teal.500">
                Recruit Smarter, Faster, Better.
              </Text>

              <Text mt={4} fontSize="lg" fontWeight="medium">
                Welcome to the <Text as="span" color="blue.500" fontWeight="bold">Admin Job Portal</Text> —
                your dedicated platform for posting jobs and managing top talent effortlessly.
              </Text>

              <Text mt={3} fontSize="md" fontWeight="normal">
                From startups to enterprises, empower your hiring process with powerful features
                designed to help you find the <Text as="span" color="green.500" fontWeight="semibold">right candidates</Text> quickly and efficiently.
              </Text>

              <Box mt={5} pl={4} as="ul" style={{ listStyleType: 'disc' }}>
                <li>
                  <Text as="span" fontWeight="semibold" color="white.700">Post and manage job listings in minutes</Text>
                </li>
                <li>
                  <Text as="span" fontWeight="semibold" color="gray.700">Track candidate applications in real-time</Text>
                </li>
                <li>
                  <Text as="span" fontWeight="semibold" color="gray.700">Shortlist and filter applicants with ease</Text>
                </li>
                <li>
                  <Text as="span" fontWeight="semibold" color="gray.700">Reach verified talent across multiple locations</Text>
                </li>
              </Box>

              <Text mt={6} fontSize="sm" color="gray.500">
                Ready to start hiring? <Text as="span" fontWeight="bold" color="blue.600">Log in and take control.</Text>
              </Text>
            </Box>

          </Box>
        )}

        <Box
          w="100%"
          maxW="500px"
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="lg"
          mx="auto"
        >
          <Flex direction="column" align="center" mb={6}>
            <Image
              src={logo}
              alt="Logo"
              maxW="150px"
              mb={4}
            />
            <Text fontSize="2xl" fontWeight="600">
              Admin Login
            </Text>
          </Flex>

          <form onSubmit={submitHandler}>
            <VStack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="Enter your password"
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

              <Button
                colorScheme="blue"
                w="100%"
                type="submit"
                isLoading={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Link to="/forget" style={{ width: "100%" }}>
                <Button colorScheme="red" w="100%">
                  Forgot Password?
                </Button>
              </Link>
            </VStack>
          </form>

          <Text fontSize="xs" color="gray.500" mt={4} textAlign="center">
            By continuing you agree to our{" "}
            <Link color="blue.500" href="#">
              privacy policy
            </Link>{" "}
            and{" "}
            <Link color="blue.500" href="#">
              terms of use
            </Link>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
