import React, { useState } from "react";
import {
  Heading,
  VStack,
  Input,
  Button,
  Text,
  Link,
  Flex,
  List,
  ListItem,
  ListIcon,
  useToast,
  InputGroup,
  InputRightElement,
  Box,
  Divider,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import * as mod from "../../../url";
import AuthLayout from "../../UserPage/AuthLayout";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";

export default function AdminAuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Email and password are required",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${mod.api_url}/api/v1/admin/login-admin`,
        { email, password }
      );

      if (data) {
        toast({
          title: "Login successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Save login info
        localStorage.setItem("lawvsadmininfo", JSON.stringify(data));

        // Navigate to dashboard
        console.log("Navigating to /admin-dashboard"); // debug
        navigate("/admin-dashboard");
        window.location.reload();
        // Reset fields
        setEmail("");
        setPassword("");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong";

      toast({
        title: "Login Failed",
        description: errorMsg,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Flex
        direction={{ base: "column", md: "row" }}
        maxW="4xl"
        mx="auto"
        p={4}
        bg="white"
        boxShadow="md"
        rounded="md"
        overflow="hidden"
      >
        <Box flex="1" p={8}>
          <Heading mb={6} fontSize="xl" color="orange.700">
            <LockIcon mr={2} /> Job/Internship Post Login
          </Heading>
          <VStack
            spacing={4}
            align="stretch"
            as="form"
            onSubmit={submitHandler}
          >
            <Input
              placeholder="Enter email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputGroup>
              <Input
                placeholder="Password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="3rem">
                <Button
                  h="1.5rem"
                  size="sm"
                  onClick={handleClick}
                  variant="ghost"
                >
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Flex justify="space-between" align="center">
              <Link
                as={RouterLink}
                to="/admin-auth-forget"
                fontWeight="bold"
                fontStyle="italic"
                textColor={"orange.600"}
              >
                Forgot Password?
              </Link>
              <Button colorScheme="orange" type="submit" isLoading={loading}>
                Login
              </Button>
            </Flex>
            <Text>
              <strong>Not Registered?</strong>{" "}
              <Link
                as={RouterLink}
                to="/admin-auth-register"
                textColor={"orange.600"}
                fontStyle="italic"
              >
                Click here to Register
              </Link>
            </Text>
          </VStack>
        </Box>

        {/* Vertical divider for desktop */}
        <Divider
          orientation="vertical"
          borderColor="gray.200"
          display={{ base: "none", md: "block" }}
        />

        <Box flex="1" p={8} bg="gray.50">
          <Heading mb={4}>Benefits with LAWVS:</Heading>
          <List spacing={3} align="left">
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="orange.400" />2 simple steps
              to post your jobs
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="orange.400" />
              Free listing of jobs
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="orange.400" />
              Affirmative response on your posted jobs
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="orange.400" />
              Use inbuilt Assessment tool to screen candidates
            </ListItem>
          </List>
        </Box>
      </Flex>
      <Footer />
    </>
  );
}
