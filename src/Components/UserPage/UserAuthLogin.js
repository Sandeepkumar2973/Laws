// src/pages/LoginPage.jsx
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
  Box,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CheckCircleIcon, LockIcon } from "@chakra-ui/icons";
import AuthLayout from "./AuthLayout";
import "./button.css";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axios from "axios";
import * as mod from "../../url";
export default function UserAuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // const isDesktop = useBreakpointValue{ base: false, md: true });

  const handleClick = () => setShow(!show);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${mod.api_url}/api/v1/user/login-user`,
        {
          email,
          password,
        }
      );
      console.log(data, "data");
      if (data.data) {
        toast({
          title: "Login successful!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        localStorage.setItem("lawvsuserinfo", JSON.stringify(data));
        navigate("/user-auth-dashboard");
        // window.location.reload();
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
  const leftContent = (
    <>
      <Heading mb={6} fontSize="xl" color="orange.700">
        <LockIcon mr={2} /> Job/Internship Seeker Login
      </Heading>
      <form onSubmit={submitHandler}>
        <VStack spacing={4} align="stretch">
          <Input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Flex justify="space-between" align="center">
            <ChakraLink
              as={RouterLink}
              to="/user-auth-forget"
              fontWeight="bold"
              fontStyle="italic"
              textColor="orange.600"
            >
              Forgot Password?
            </ChakraLink>

            <Button
              type="submit"
              colorScheme="yellow"
              isLoading={loading}
              bg="goldenrod"
              color="white"
            >
              Login
            </Button>
          </Flex>
          <Text>
            <strong>Not Registered?</strong>{" "}
            <ChakraLink
              as={RouterLink}
              to="/user-auth-signup"
              textColor="orange.600"
              fontStyle="italic"
            >
              Click here to Register
            </ChakraLink>
          </Text>
        </VStack>
      </form>
    </>
  );

  const rightContent = (
    <>
      <Heading mb={4}>Benefits with LAWVS:</Heading>
      <List spacing={3} align="left">
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          One click apply using LAWVS profile.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          Get relevant job recommendations.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          Showcase profile to top companies and consultants.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          Know application status on applied jobs.
        </ListItem>
      </List>
      <div id="pointer"></div>
    </>
  );

  return <AuthLayout left={leftContent} right={rightContent} />;
}
