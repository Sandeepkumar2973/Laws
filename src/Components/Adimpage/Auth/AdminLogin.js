// src/pages/AdminAuthLogin.jsx
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
  useBreakpointValue,
} from "@chakra-ui/react";
import { CheckCircleIcon, LockIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import * as mod from "../../../url"; // <-- adjust path to your config
import AuthLayout from "../../UserPage/AuthLayout"; // <-- adjust path if needed

export default function AdminAuthLogin() {
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
      const { data } = await axios.post(
        `${mod.api_url}/api/v1/admin/login-admin`,
        {
          email,
          password,
        }
      );
      console.log(data, "data");
      if (data) {
        toast({
          title: "Login successful!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        localStorage.setItem("lawvsadmininfo", JSON.stringify(data));
        navigate("/admin-dashboard");
        // window.location.reload();
        setEmail("");
        setPassword("");
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      toast({
        title: "Error occurred.",
        description: error.response,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Left side: Login Form
  const leftContent = (
    <>
      <Heading mb={6} fontSize="xl" color="orange.700">
        <LockIcon mr={2} /> Job/Internship Post Login
      </Heading>
      <VStack spacing={4} align="stretch" as="form" onSubmit={submitHandler}>
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
    </>
  );

  // Right side: Benefits list
  const rightContent = (
    <>
      <Heading mb={4}>Benefits with LAWVS:</Heading>
      <List spacing={3} align="left">
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />2 simple steps to
          post your jobs
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          Free listing of jobs
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          Affirmative response on your posted jobs.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          Use inbuilt Assessment tool to screen candidates
        </ListItem>
      </List>
    </>
  );

  return <AuthLayout left={leftContent} right={rightContent} />;
}
