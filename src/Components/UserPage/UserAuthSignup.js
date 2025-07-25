// src/pages/RegisterPage.jsx
import React from "react";
import {
  Heading,
  VStack,
  Input,
  Select,
  Checkbox,
  Button,
  Text,
  Link,
  List,
  ListItem,
  ListIcon,
  Box,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import AuthLayout from "./AuthLayout";
import "./button.css";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
export default function UserAuthSignup() {
  const leftContent = (
    <>
      <Heading mb={6} fontSize="xl" color="orange.700">
        Registration
      </Heading>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Enter your full name" />
        <Input placeholder="Enter your email" />
        <Input placeholder="Enter your number" />
        <Select placeholder="What are you looking for?">
          <option>Job</option>
          <option>Internship</option>
        </Select>
        <Input placeholder="Password" type="password" />
        <Input placeholder="Confirm Password" type="password" />
        <Checkbox>I agree to the Terms and Conditions</Checkbox>
        <Button colorScheme="yellow">Submit</Button>
      </VStack>
      <Text mt={4}>
        Already Registered?{" "}
       <ChakraLink as={RouterLink} to="/user-auth-login">
                   Click here to login
                 </ChakraLink>
      </Text>
    </>
  );

  const rightContent = (
    <>
      <Heading mb={4} marginTop={"100px"}>
        New to LAWVS:
      </Heading>
      <List spacing={3} align="left">
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          Build your profile and let recruiters find you.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          Get job postings delivered right to your email.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          Find a job and grow your career.
        </ListItem>
      </List>
      <div id="pointer"></div>
    </>
  );

  return <AuthLayout left={leftContent} right={rightContent} />;
}
