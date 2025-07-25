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
// import "./../..UserPage/button.css";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import AuthLayout from "../../UserPage/AuthLayout";
import "./Auth.css";

export default function AdminAuthRegister() {
  const leftContent = (
    <>
      <Heading mb={6} fontSize="xl" color="orange.700">
        Job/Internship Posting Registration
      </Heading>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Name of company/Firm /Advocate" />
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
        <ChakraLink as={RouterLink} to="/admin-auth-login" textColor={"orange.600"} fontStyle="italic">
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
          2 simple steps to post your jobs
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
          India's only Portal for Law candidates and interns
        </ListItem>
      </List>
      <div id="pointer"></div>
    </>
  );

  return <AuthLayout left={leftContent} right={rightContent} />;
}
