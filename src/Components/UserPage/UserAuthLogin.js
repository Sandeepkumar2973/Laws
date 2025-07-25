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
import AuthLayout from "./AuthLayout";
import "./button.css";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
export default function UserAuthLogin() {
  const leftContent = (
    <>
      <Heading mb={6} fontSize="xl" color="orange.700">
        <LockIcon mr={2} /> Job/Internship Seeker Login
      </Heading>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Enter email" />
        <Input placeholder="Password" type="password" />
        <Flex justify="space-between" align="center">
          
          <ChakraLink as={RouterLink} to="/user-auth-forget" fontWeight="bold" fontStyle="italic">
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
          <ChakraLink as={RouterLink} to="/user-auth-signup" >
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
