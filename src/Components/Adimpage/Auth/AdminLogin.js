// src/pages/LoginPage.jsx
import React from "react";
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
} from "@chakra-ui/react";
import { CheckCircleIcon, LockIcon } from "@chakra-ui/icons";
import AuthLayout from "../../UserPage/AuthLayout";
// import "./../..UserPage/button.css";
import "./Auth.css";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
export default function AdminAuthLogin() {
  const leftContent = (
    <>
      <Heading mb={6} fontSize="xl" color="orange.700">
        <LockIcon mr={2} /> Job/Internship Post Login
      </Heading>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Enter email" />
        <Input placeholder="Password" type="password" />
        <Flex justify="space-between" align="center">
          <ChakraLink as={RouterLink} to="/admin-auth-forget" fontWeight="bold" fontStyle="italic" textColor={"orange.600"}>
            Forgot Password?
          </ChakraLink>
          {/* <Button colorScheme="yellow">Submit</Button> */}

          <div class="button">
            <a href="#">login</a>
          </div>
        </Flex>
        <Text>
          <strong>Not Registered?</strong>{" "}
          {/* <Link href="#" textDecoration="underline" fontStyle="italic">
            Click here to Register
          </Link> */}
          <ChakraLink as={RouterLink} to="/admin-auth-register" textColor={"orange.600"} fontStyle="italic">
            Click here to Register
          </ChakraLink>
        </Text>
      </VStack>
    </>
  );

  const rightContent = (
    <>
      <Heading mb={4}>Benefits with LAWVS:</Heading>
      <List spacing={3} align="left">
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          2 simple steps to post your jobs
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
      <div id="pointer"></div>
    </>
  );

  return <AuthLayout left={leftContent} right={rightContent} />;
}
